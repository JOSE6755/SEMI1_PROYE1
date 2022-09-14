//librería para manejo de imagenes
const multer = require('multer');
const path = require('path');

//  almacenamiento y directorios de manejo de imagenes para avatatres
const storageConfigAvatars = multer.diskStorage(
    {
        // directorio imagenes
        destination: (req, file, callBack) => {
            callBack(null, 'imagenes')
        },
        filename: (req, file, callBack) => {

            callBack(null, file.originalname)
            //callBack(null, path.extname(file.originalname))
        }
    }
);

// almacenamiento  y directorios de manejo de imagenes para los post
// const stConfigImagePost = multer.diskStorage(
//     {
//         //directorio de imagenes
//         destination: (req, file, callBack) => {
//             callBack(null, 'postimg')
//         },
//         filename: (req, file, callBack) => {
//             callBack(null, req.query.username + '_' + file.originalname)
//         }
//     }
// );

const stConfigFileUpload = multer.diskStorage(
    {
        destination: (req, file, callBack) => {
            callBack(null, 'files')
        },
        filename: (req, file, callBack) => {
            // name = JSON.parse(req.body.info)
            // callBack(null, path.basename(name.filename) + path.extname(file.originalname))
            callBack(null, file.originalname)
        }
    }
);

const uploadAvatar = multer({storage: storageConfigAvatars});
const uploadFile = multer({storage: stConfigFileUpload})
// const uploadPostImg = multer({storage: stConfigImagePost});

module.exports.uploadAvatar = uploadAvatar;
module.exports.uploadFile = uploadFile;
