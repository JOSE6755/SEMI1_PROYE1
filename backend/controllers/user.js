const users = require('../db_apis/user')
const status = require('http-status')
const crypto = require('crypto')
const path = require('path');
const s3 = require('../services/s3')

async function postRegister(req, res, next) {
    const file = req.file

    if (!file) {
        const error = new Error('No file')
        error.httpRequestStatusCode = 400;
        return next(error);
    }

    const hash = crypto.createHash('sha512');
    let data;
    let user;
    let newUser;
    let random, fileName, keyFile, s3_dir

    try {
        newUser = JSON.parse(req.body.info)
        user = []
        data = hash.update(String(newUser.pass).trim(), 'utf-8')
        user.push(newUser.user.trim())
        user.push(data.digest('hex'))
        user.push(newUser.correo.trim())
        // user.push("test")

        ///mandar imagen a amazon
        random =   (Math.floor(Math.random() * 10000) + 1).toString()
        fileName = "imagenes/"+ req.file.name
        keyFile = random + req.file.name

        s3_dir  = await  s3.uploadS3(fileName,keyFile)
        user.push(s3_dir)

        user = await users.create(user)
        if (user === undefined) {
            res.status(status.INTERNAL_SERVER_ERROR).json({message: "Error en el registro no se ha podido consultar a la base de datos"}).end();

        } else {
            res.status(status.CREATED).json({message: "usuario creado corretamente"}).end()
        }

    } catch (err) {
        switch (err.code) {
            case"ETIMEDOUT":
                res.status(status.INTERNAL_SERVER_ERROR).json({
                    message: "Error en el registro, no hay conexión con la base de datos",
                    error: err
                }).end();
                break;
            case "ER_DUP_ENTRY":
                if (err.message.includes("for key 'User.username'")) {
                    res.status(status.BAD_REQUEST).json({
                        message: "El username ya esta en uso, por favor utilice otro",
                        error: err
                    }).end();
                    break;

                } else if (err.message.includes("for key 'User.email'")) {
                    res.status(status.BAD_REQUEST).json({
                        message: "El correo ya esta en uso, por favor utilice otro",
                        error: err
                    }).end();
                    break;

                } else {
                    res.status(status.INTERNAL_SERVER_ERROR).json({
                        message: "Campo duplicado, verifique",
                        error: err
                    }).end();
                    break;
                }
            default:
                res.status(status.INTERNAL_SERVER_ERROR).json({message: "Error en el registro", error: err}).end();
        }
        next(err)
    }
}

async function getFilesFromFriends(req, res, next) {
    let username, files
    let filesFriendsA = [], allFiles = []
    let fileFF, ext;
    try {
        username = req.params.username
        filesFriendsA.push(username)

        files = await users.getFilesFromFriends(filesFriendsA)


        files[0].forEach(file => {
            fileFF = {}
            ext = path.extname(file.file_name).toLowerCase()
            if (ext === ".jpg" || ext === ".png" || ext === ".svg"
                || ext === ".jpeg" || ext === ".bmp") {
                fileFF.image = file.url_bucket
            } else {
                fileFF.image = ""
            }
            fileFF.name = file.file_name
            fileFF.propietario = file.username
            fileFF.fecha = file.creation_date
            fileFF.url = file.url_bucket
            allFiles.push(fileFF)
        })

        res.status(status.OK).json({archivos: allFiles}).end()


    } catch (err) {
        if (err.code === undefined) {
            res.status(status.INTERNAL_SERVER_ERROR).json({message: "Error en en getFileFriends", error: err}).end();
        }
        switch (err.code) {
            case"ETIMEDOUT":
                res.status(status.INTERNAL_SERVER_ERROR).json({
                    message: "Error en el login, no hay conexión con la base de datos",
                    error: err
                }).end();
                break;
            default:
                res.status(status.INTERNAL_SERVER_ERROR).json({message: "Error en el login", error: err}).end();
        }
        next(err)
    }

}

async function postLogin(req, res, next) {
    const hash = crypto.createHash('sha512');

    let user
    let passSHA
    let isValid
    let userA = []

    try {
        user = JSON.parse(Buffer.from(req.params.enter, "base64").toString('utf-8'))
        passSHA = hash.update(String(user.pass).trim(), 'utf-8')
        userA.push(user.user.trim())
        userA.push(passSHA.digest('hex'))
        isValid = await users.login(userA)
        if (isValid[0].length === 1) {
            res.status(status.OK).json({user: userA[0], message: "Inicio de sesión correcto, Bienvenido: + "+ userA[0] }).end()
        } else {
            res.status(status.BAD_REQUEST).json({message: "Combinación Username y/o contraseña Incorrecta, vuelva a intentarlo"}).end()
        }
    } catch (err) {
        if (err.code === undefined) {
            res.status(status.INTERNAL_SERVER_ERROR).json({message: "Error en el login", error: err}).end();
        }
        switch (err.code) {
            case"ETIMEDOUT":
                res.status(status.INTERNAL_SERVER_ERROR).json({
                    message: "Error en el login, no hay conexión con la base de datos",
                    error: err
                }).end();
                break;
            default:
                res.status(status.INTERNAL_SERVER_ERROR).json({message: "Error en el login", error: err}).end();
        }
        next(err)
    }
}

async function editFile(req, res, next) {
    let editJs, isValid
    let editA = []
    const hash = crypto.createHash('sha512');


    try {
        editJs = req.body
        let passSH = hash.update(String(req.body.passw).trim(), 'utf-8')
        //new values
        editA.push((editJs.nuevoNombre.substring(0, editJs.nuevoNombre.lastIndexOf('.')) ||
            editJs.nuevoNombre) + path.extname(editJs.archivo.trim()))
        editA.push(new Date().toISOString().slice(0, 19).replace('T', ' '))
        editA.push(editJs.nuevaVisibilidad.toLowerCase().trim() === "public")

        //conditions
        editA.push(editJs.usuario.trim())
        editA.push(editJs.visibility.toLowerCase().trim() === "public")
        editA.push(editJs.archivo.trim())
        editA.push(passSH.digest('hex'))

        isValid = await users.editFile(editA)
        if (isValid[0].affectedRows === 1) {
            res.status(status.OK).json({message: "Archivo "+ req.body.archivo  +" editado correctamente"}).end()
        } else {
            res.status(status.BAD_REQUEST).json({
                message:
                    "Error: el archivo no se ha podido editar porque no existe el archivo: " +
                    editA[0] + " vinculado al usuario: " + editA[1] + " con visibilidad: " +
                    (editA[3] ? "publica " : "privada")
            }).end()
        }


    } catch (err) {
        if (err.code === undefined) {
            res.status(status.INTERNAL_SERVER_ERROR).json({
                message: "Error en la Edicion del archivo",
                error: err.toString()
            }).end();
        }
        switch (err.code) {
            case"ETIMEDOUT":
                res.status(status.INTERNAL_SERVER_ERROR).json({
                    message: "Error en la edición del archivo, no hay conexión con la base de datos",
                    error: err.toString()
                }).end();
                break;
            default:
                res.status(status.INTERNAL_SERVER_ERROR).json({
                    message: "Error en la edición de un archivo",
                    error: err.toString()
                }).end();
        }
        next(err)
    }

}

async function deleteFile(req, res, next) {
    const hash = crypto.createHash('sha512');
    let deleteJs, isValid
    let deleteA = []

    try {
        // deleteJs = JSON.parse(req.body.info)
        deleteA.push(req.body.archivo.trim())
        deleteA.push(req.body.visibility.toLowerCase().trim() === "public")
        deleteA.push(req.body.usuario.trim())
        let passSH = hash.update(String(req.body.passw).trim(), 'utf-8')
        deleteA.push(passSH.digest('hex'))

        isValid = await users.deleteFile(deleteA)

        if (isValid[0].affectedRows === 1) {
            res.status(status.OK).json({message: "Archivo eliminado correctamente"}).end()
        } else {
            res.status(status.BAD_REQUEST).json({
                message:
                    "Error:  el archivo" + deleteA[0] + " no se ha podido eliminar porque no existe el archivo: " +
                    "ó no esta vinculado al usuario: " + deleteA[2]
            }).end()
        }
    } catch (err) {
        if (err.code === undefined) {
            res.status(status.INTERNAL_SERVER_ERROR).json({
                message: "Error en la eliminación del archivo",
                error: err
            }).end();
        }
        switch (err.code) {
            case"ETIMEDOUT":
                res.status(status.INTERNAL_SERVER_ERROR).json({
                    message: "Error en la eliminación de archivo, no hay conexión con la base de datos",
                    error: err
                }).end();
                break;
            default:
                res.status(status.INTERNAL_SERVER_ERROR).json({
                    message: "Error en la eliminación de un archivo",
                    error: err
                }).end();
        }
        next(err)
    }

}

async function uploadFile(req, res, next) {
    const hash = crypto.createHash('sha512');

    if (req.file === undefined) {
        res.status(status.BAD_REQUEST).json({
            message:
                "Error: Archivo no recibido por favor seleccione un archivo"
        }).end()

    }


    let upload, passSH, query
    let random, fileName, keyFile, s3_dir
    let uploadA = []
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

    try {
        upload = JSON.parse(req.body.info)
        passSH = hash.update(String(upload.pass).trim(), 'utf-8')

        uploadA.push((upload.filename === undefined || upload.filename === "") ?
            req.file.originalname : (upload.filename.substring(0, upload.filename.lastIndexOf('.')) ||
            upload.filename) + path.extname(req.file.originalname)) //filename
        uploadA.push((upload.visibility.toLowerCase().trim() === "public")) //public
        uploadA.push(now) //creation_date
        uploadA.push(now) //edition_date
        /// mandar imagen a amazan....

        random =   (Math.floor(Math.random() * 10000) + 1).toString()
        fileName = "files/"+ req.file.name
        keyFile = random + req.file.name

        s3_dir  = await  s3.uploadS3(fileName,keyFile)



        uploadA.push(s3_dir) //edition_date
        uploadA.push(upload.propietario.trim()) // propietario
        uploadA.push(passSH.digest('hex')) //Pass

        query = await users.upload(uploadA)

        if (query[0].affectedRows === 1) {
            res.status(status.CREATED).json({message: "Archivo creado correctamente"}).end()
        } else {
            res.status(status.BAD_REQUEST).json({message: "Combinación usuario y contraseña incorrectos"}).end()
        }

    } catch (err) {
        if (err.code === undefined) {
            res.status(status.INTERNAL_SERVER_ERROR).json({message: "Error al subir el archivo", error: err}).end();
        }
        switch (err.code) {
            case"ETIMEDOUT":
                res.status(status.INTERNAL_SERVER_ERROR).json({
                    message: "Error en la subid de. archivo, no hay conexión con la base de datos",
                    error: err
                }).end();
                break;
            default:
                res.status(status.INTERNAL_SERVER_ERROR).json({
                    message: "Error en la subida del archvo",
                    error: err
                }).end();
        }
        next(err)
    }

}

async function getAllUsers(req, res, next) {
    let usernameA = [], userRes = []
    try {
        usernameA.push(req.params.username.trim())

        usersA = await users.getAllUsers(usernameA)

        usersA[0].forEach(userI => {
            let user = {}
            user.username = userI.username
            user.avatar = userI.avatar
            user.archivosPublicos = userI.count_files
            userRes.push(user)
        })
        res.status(status.OK).json({usuarios: userRes}).end()
    } catch (err) {
        if (err.code === undefined) {
            next.status(status.INTERNAL_SERVER_ERROR).json({message: "Error en getallUsers", error: err}).end();
        }
        switch (err.code) {
            case"ETIMEDOUT":
                next.status(status.INTERNAL_SERVER_ERROR).json({
                    message: "Error en getAllUsers, no hay conexión con la base de datos",
                    error: err
                }).end();
                break;
            default:
                res.status(status.INTERNAL_SERVER_ERROR).json({
                    message: "Error en getAllUsers",
                    error: err
                }).end();
        }
        next(err)
    }
}

async function searchUser(req, res, next) {
    let searchA = [], resultsA = []

    try {
        searchA.push("%"+req.body.busqueda+"%")

        results = await users.searchUser(searchA)
        results[0].forEach(resI => {
            resultsA.push({
                username: resI.username,
                archivosPublicos: resI.count_files,
                avatar: resI.avatar
            })
        })

        if (resultsA.length === 0) {
            res.status(status.OK).json({resultados: resultsA, mensaje: "Error Usuario no Hallado"}).end()

        } else {
            res.status(status.OK).json({resultados: resultsA, mensaje: "Usuario Hallado"}).end()
        }

    } catch (err) {
        if (err.code === undefined) {
            next.status(status.INTERNAL_SERVER_ERROR).json({message: "Error en searchUser", error: err}).end();
        }
        switch (err.code) {
            case"ETIMEDOUT":
                next.status(status.INTERNAL_SERVER_ERROR).json({
                    message: "Error en searchUser, no hay conexión con la base de datos",
                    error: err
                }).end();
                break;
            default:
                res.status(status.INTERNAL_SERVER_ERROR).json({
                    message: "Error en searchUser",
                    error: err
                }).end();
        }
        next(err)
    }
}


module.exports.postRegister = postRegister
module.exports.postLogin = postLogin
module.exports.uploadFile = uploadFile
module.exports.deleFile = deleteFile
module.exports.editFile = editFile
module.exports.getFilesFromFriends = getFilesFromFriends
module.exports.getAllUsers = getAllUsers
module.exports.searchUser = searchUser
