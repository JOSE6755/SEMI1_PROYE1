const file = require('../db_apis/file')
const user = require('../db_apis/user')
const status = require('http-status')
const crypto = require('crypto')
const path = require('path');



async function getAllFilesUser(req, res, next){

    let userA = [], privFilesRes = [], pubFilesRes = []
    let privFiles, pubFiles, fileFF, avatar
    try {
        userA.push(req.params.username.trim())

        privFiles = await file.getAllUsersFiles( userA, false)
        pubFiles =  await file.getAllUsersFiles( userA, true)
        avatar = await  user.getAvatar(userA)

        pubFiles[0].forEach( fileI => {
            fileFF = {}
            fileFF.name = fileI.file_name
            fileFF.propietario = fileI.username
            fileFF.fecha_creacion = fileI.creation_date
            fileFF.fecha_modificacion = fileI.edition_date
            fileFF.url = fileI.url_bucket

            ext = path.extname(fileI.file_name).toLowerCase()
            if (ext === ".jpg" || ext === ".png" || ext === ".svg"
                || ext === ".jpeg" || ext === ".bmp") {
                fileFF.imagen = fileI.url_bucket
            } else {
                fileFF.imagen = ""
            }
            fileFF.ext = ext

            pubFilesRes.push(fileFF)
        } )

        privFiles[0].forEach( fileI => {
            fileFF = {}
            fileFF.name = fileI.file_name
            fileFF.propietario = fileI.username
            fileFF.fecha_creacion = fileI.creation_date
            fileFF.fecha_modificacion = fileI.edition_date
            fileFF.url = fileI.url_bucket

            ext = path.extname(fileI.file_name).toLowerCase()
            if (ext === ".jpg" || ext === ".png" || ext === ".svg"
                || ext === ".jpeg" || ext === ".bmp") {
                fileFF.imagen = fileI.url_bucket
            } else {
                fileFF.imagen = ""
            }
            fileFF.ext = ext

            privFilesRes.push(fileFF)
        } )

        res.status(status.OK).json( {
            privFiles: privFilesRes,
            PubFiles: pubFilesRes,
            userImage: avatar[0][0].avatar
        } ).end()

    }catch (err) {
        if (err.code === undefined) {
            res.status(status.INTERNAL_SERVER_ERROR).json({message: "Error en get All files", error: err.toString()}).end(
                () => { next(err)});
        }
        switch (err.code) {
            case"ETIMEDOUT":
                res.status(status.INTERNAL_SERVER_ERROR).json({
                    message: "Error en get All Files, no hay conexión con la base de datos",
                    error: err
                }).end();
                break;
            default:
                res.status(status.INTERNAL_SERVER_ERROR).json({message: "Error en get All Files", error: err}).end(
                    () => { next(err)}
                );
        }
        next(err)
    }

}

async function deleteGetFiles(req, res, next){
    let usernameA = [], filesRes = []

    try{
        usernameA.push(req.body.user.trim())

        files = await  file.deleteGetFiles(usernameA)

        files[0].forEach( fileI => {
            let fileFF = {}
            fileFF.visibilidad = fileI.visibility
            fileFF.name = fileI.file_name
            fileFF.fecha = fileI.creation_date
            fileFF.url = fileI.url_bucket

            ext = path.extname(fileI.file_name).toLowerCase()
            if (ext === ".jpg" || ext === ".png" || ext === ".svg"
                || ext === ".jpeg" || ext === ".bmp") {
                fileFF.imagen = fileI.url_bucket
            } else {
                fileFF.imagen = ""
            }

            filesRes.push(fileFF)
        } )

        res.status(status.OK).json({archivos: filesRes}).end()

    } catch (err) {
        if (err.code === undefined) {
            res.status(status.INTERNAL_SERVER_ERROR).json({message: "Error en get files", error: err.toString()}).end(
                () => { next(err)});
        }
        switch (err.code) {
            case"ETIMEDOUT":
                res.status(status.INTERNAL_SERVER_ERROR).json({
                    message: "Error en getFiles, no hay conexión con la base de datos",
                    error: err
                }).end();
                break;
            default:
                res.status(status.INTERNAL_SERVER_ERROR).json({message: "Error en getFiles", error: err}).end(
                    () => { next(err)}
                );
        }
        next(err)
    }
}

module.exports.deleteGetFiles = deleteGetFiles
module.exports.getAllFilesUser = getAllFilesUser
