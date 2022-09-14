const database = require("../services/database");

const delete_getFilesQ = `
select file_name,
       U.username,
       IF(public <> 0, 'private', 'public')          as visibility,
       DATE_FORMAT(creation_date, '%Y-%m%-%d %H:%i') as "creation_date",
        url_bucket
from File
         join User U on U.id_user = File.id_owner
where U.username = ?
`

const getAllUserFilesQ = `
select file_name,
       username,
       DATE_FORMAT(edition_date, '%Y-%m%-%d %H:%i')  as "edition_date",
       DATE_FORMAT(creation_date, '%Y-%m%-%d %H:%i') as "creation_date",
       url_bucket
from File
         join User U on U.id_user = File.id_owner
where U.username = ?
`

async function delete_getFiles(username) {
    const userN = Object.assign({}, username)
    return await database.simpleExecute(delete_getFilesQ, userN)
}

async function getAllUserFiles(username, isPublic) {
    const userN = Object.assign({}, username)
    if (isPublic) {
        return await database.simpleExecute(getAllUserFilesQ +
            "and public = true", userN)
    } else {
        return await database.simpleExecute(getAllUserFilesQ +
            "and public = false", userN)
    }
}

module.exports.deleteGetFiles = delete_getFiles
module.exports.getAllUsersFiles = getAllUserFiles
