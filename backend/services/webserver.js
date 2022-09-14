const http = require('http');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const websererConfig = require('../config/web_server');
const router = require('./router');

let httpServer;

const iso8601RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

function reviveJson(key, value) {
    // revive ISO 8601 date strings to instances of Date
    if (typeof value === 'string' && iso8601RegExp.test(value)) {
        return new Date(value);
    } else {
        return value;
    }
}

function initialize(){
    return new Promise(((resolve, reject) => {
        const app = express();
        httpServer = http.createServer(app);

        //plugins para express
        app.use(cors({origin: '*'}));
        app.use(morgan('combined'));

        //carpetas publicas (archivos compartidos)
        app.use('/avatar', express.static('imagenes'));
        app.use('/postimg', express.static('postimg'));



        app.use(express.json({
            reviver: reviveJson
        }));

        app.use('/api', router);

        httpServer.listen(websererConfig.port, err => {
            if (err){
                reject(err);
            }
            console.log('Servidor escuchando en localhost:${webServerConfig.port}');
            resolve();
        });
    }));
}

function close (){
    return new Promise((resolve, reject) => {
        httpServer.close((error) => {
           if (error) {
               reject(error)
           }
           resolve();
        });
    });

}

module.exports.initialize = initialize;
module.exports.close = close;

