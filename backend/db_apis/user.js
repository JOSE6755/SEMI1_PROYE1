const database = require('../services/database')


const registeruser = `
insert User( username, password, email, avatar )
values ( ? , ? , ? , ? )
`

const loginUser = `
select  username from User
where username = ? and password = ?
`

const uploadFile = `
INSERT INTO File(id_owner, file_name, public,creation_date, edition_date, url_bucket )
SELECT id_user, ?, ?, ?, ?, ? from User where username = ? and password = ?
`
const deleteFile = `
delete
from File
where file_name = ?
  and public = ?
  and id_owner in
      (select id_user from User where username = ? and password = ? )
`

const editFileQ = `
update File, User
join File F on User.id_user = F.id_owner
set F.file_name = ?, F.edition_date = ?, F.public = ?
where User.username = ? and F.public = ? and F.file_name = ? and User.password = ?;
`

const getFilesFromFriendsQuery = `
select U2.username,
       F.file_name,
       DATE_FORMAT(F.creation_date, '%Y-%m%-%d %H:%i')
           as "creation_date",
       F.url_bucket
from Friendship
         join User U on U.id_user = Friendship.id_user
         join User U2 on U2.id_user = Friendship.id_friend
         join File F on Friendship.id_friend = F.id_owner
where U.username = ?
  and public = true ;
`

const getAllUsersQ = `
select username, avatar, count(F.id_owner) as count_files
from User
    left  join File F on User.id_user = F.id_owner
where username <> ? and ( F.public <> false or F.public IS NULL)
group by User.id_user;
`

const searchUserQ = `
select username, avatar, count(F.id_owner) as count_files
from User
         left join File F on User.id_user = F.id_owner
where username like ?
  and (F.public <> false or F.public IS NULL)
group by User.id_user
`
const getAvatarQ = `
select avatar
from User
where username = ?
`

async function getAvatar(username){
    const userN = Object.assign({},username)
    return await  database.simpleExecute(getAvatarQ, userN)
}

async function create(newUser){
    const newUserB = Object.assign({}, newUser)
    return await database.simpleExecute(registeruser, newUserB);
}

async function login(user){
    const UserB = Object.assign({}, user)
    return await database.simpleExecute(loginUser, UserB );
}

async function upload(file){
    const upload = Object.assign({}, file)
    return await  database.simpleExecuteWithDate(uploadFile, upload )
}

async function deleteFl(file){
    const deleteF = Object.assign({}, file)
    return await database.simpleExecute(deleteFile, deleteF)
}

async function editFile(file){
    const editF = Object.assign({}, file)
    return await  database.simpleExecuteWithDate(editFileQ, editF)
}

async function getFilesFromFriends(username){
    const userN = Object.assign({}, username)
    return await database.simpleExecute(getFilesFromFriendsQuery, userN)
}


async function getAllUsers(username){
    const userN = Object.assign({}, username)
    return await database.simpleExecute(getAllUsersQ, userN)
}

async function searchUser(search){
    const searchN = Object.assign({}, search)
    return await  database.simpleExecute(searchUserQ, searchN)
}

module.exports.create = create;
module.exports.login = login;
module.exports.upload = upload
module.exports.deleteFile = deleteFl
module.exports.editFile = editFile
module.exports.getFilesFromFriends = getFilesFromFriends
module.exports.getAllUsers = getAllUsers
module.exports.searchUser = searchUser
module.exports.getAvatar = getAvatar
