const friendship = require('../db_apis/friendship')
const status = require('http-status')
const crypto = require('crypto')
const path = require('path');


async function addFriend(req, res, next) {
    let friendshipA = []

    try {
        friendshipA.push(new Date().toISOString().slice(0, 19).replace('T', ' '))
        friendshipA.push(req.body.username.trim())
        friendshipA.push(req.body.newFriend.trim())
        friendshipA.push(req.body.username.trim())
        friendshipA.push(req.body.newFriend.trim())

        isValid = await friendship.addFriend(friendshipA)

        if (isValid[0].affectedRows === 1) {
            res.status(status.OK).json({message: "Solicitud procesada correctamente"}).end()
        } else {
            res.status(status.BAD_REQUEST).json({
                message:
                    "Error al crear amistad, es probable que esta amistad ya exista"
            }).end()
        }
    } catch (err) {
        if (err.code === undefined) {
            next.status(status.INTERNAL_SERVER_ERROR).json({message: "Error en add Friend ", error: err}).end();
        }
        switch (err.code) {
            case"ETIMEDOUT":
                next.status(status.INTERNAL_SERVER_ERROR).json({
                    message: "Error en addFriends, no hay conexión con la base de datos",
                    error: err
                }).end();
                break;
            default:
                next.status(status.INTERNAL_SERVER_ERROR).json({message: "Error en addFriends", error: err}).end();
        }
        next(err)
    }
}

async function getAllFilesFromFriends(req, res, next) {
    let usernameA = [], filesRes = []
    let filesFF, fileRes, ext
    try {
        usernameA.push(req.params.username)

        filesFF = await friendship.getFilesFromFriends(usernameA, req)
        filesFF[0].forEach(fileI => {
                fileRes = {}
                ext = path.extname(fileI.file_name).toLowerCase()
                if (ext === ".jpg" || ext === ".png" || ext === ".svg"
                    || ext === ".jpeg" || ext === ".bmp") {
                    fileRes.image = fileI.url_bucket
                } else {
                    fileRes.image = ""
                }
                fileRes.nombre = fileI.file_name
                fileRes.url = fileI.url_bucket
                fileRes.fechaCreacion = fileI.creation_date
                fileRes.fechaEdicion = fileI.edition_date
                fileRes.propietario = fileI.username
                fileRes.ext = ext

                filesRes.push(fileRes)
            }
        )
        res.status(status.OK).json({
            archivos: filesRes, mensaje: (filesRes.length === 0) ?
                "Error no se han encontrado archivo(s)" : "Se han encontrado archivo(s)"
        }).end()

    } catch (err) {
        if (err.code === undefined) {
            res.status(status.INTERNAL_SERVER_ERROR).json({
                message: "Error en getAllFiles  ",
                error: err.toString()
            }).end(() => {
                next(err)
            });

        }
        switch (err.code) {
            case"ETIMEDOUT":
                res.status(status.INTERNAL_SERVER_ERROR).json({
                    message: "Error en getAllFiles, no hay conexión con la base de datos",
                    error: err.toString()
                }).end(() => {
                    next(err)
                });

                break;
            default:
                res.status(status.INTERNAL_SERVER_ERROR).json({
                    message: "Error en getAllFiles",
                    error: err.toString()
                }).end(() => {
                    next(err)
                });
        }
        next(err)
    }
}


module.exports.addFriend = addFriend
module.exports.getAllFilesFromFriends = getAllFilesFromFriends
