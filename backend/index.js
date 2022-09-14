const webServer = require('./services/webserver');

const db = require('./config/database')
const defaultThreadPoolSize = 4;




async function starup(){
    console.log('Iniciando aplicación');

    // try{
    //     console.log('Iniciando módulo de la base de datos');
    //     //await database.initialize();
    // }catch (err){
    //     console.error(err);
    //     //proceso cerrado de forma incorrecta
    //     process.exit(1);
    // }

    try {
        console.log("Iniciando módulo de servidor web");
        await webServer.initialize();

    }catch (err){
        console.error(err);
        process.exit(1);
    }

    try {

    }catch (err){

    }

}

starup();

async function shutdown(e) {
    db.pool.end()
    let err = e;

    console.log('Apagando servicios:');
    try {
        console.log('Cerrando el módulo del servidor web');
        await webServer.close();

    } catch (e)  {
        console.log('Se ha encontrado un error: ', e);
        err = err || e;
    }

    try {
        console.log('Cerrando el módulo de la base de datos');
       // await database.close();
    } catch (err) {
        console.log('Se ha encontrado un error: ', err);
        err = err || e;
    }

    console.log('Saliendo del proceso');
    if (err) {
        process.exit(1) // código de falla
    } else {
        process.exit(0);
    }
}

process.on('SIGTERM', () => {
    console.log('Recibido: SIGTERM');

    shutdown();
});

process.on('SIGINT', () => {
    console.log('Recibido: SIGINT');

    shutdown();
});

process.on('uncaughtException', err => {
    console.log('Excepcion no controlada');
    console.error(err);

    // shutdown(); esto lo hace inmortal :D
} );

