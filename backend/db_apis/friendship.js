const database = require("../services/database");

const addFriendQ = `
INSERT INTO Friendship(id_user, id_friend, date_added)
select *
from (
         SELECT User.id_user, U2.id_user as 'id_user2', ?
         from User
                  join User U2 on User.id_user <> U2.id_user
         where User.username = ?
           and U2.username = ?
     ) as Temp where  NOT EXISTS(
         select  Friendship.id_user, Friendship.id_friend  from Friendship
         join User U on Friendship.id_user = U.id_user
         join User U2 on Friendship.id_friend = U2.id_user
         where  U.username = ? and U2.username = ?
    )
`
const getFilesFromFriendsQ = `
select F.file_name,
       U2.username,
       F.url_bucket,
       DATE_FORMAT(F.edition_date, '%Y-%m%-%d %H:%i')  as "edition_date",
       DATE_FORMAT(F.creation_date, '%Y-%m%-%d %H:%i') as "creation_date"
from Friendship
         join User U on U.id_user = Friendship.id_user
         join File F on Friendship.id_friend = F.id_owner
         join User U2 on F.id_owner = U2.id_user
where U.username = ?
  and F.public = true
`

async function getFilesFromFriends(username, req){
    const usernameN = Object.assign({}, username)

    if (usernameN[0] === undefined) {
        usernameN[0] = req.body.username.trim()
        usernameN[1] = "%" +  req.body.nombreArchivo + "%"
        return  await database.simpleExecute(getFilesFromFriendsQ + " and F.file_name like ? ", usernameN)
    }

    return await database.simpleExecute(getFilesFromFriendsQ,usernameN)
}


async function addFriend(friendship, req){
    const friendShp = Object.assign({}, friendship, req)

    if (req.body )

    return await  database.simpleExecuteWithDate(addFriendQ, friendShp)
}

module.exports.addFriend = addFriend
module.exports.getFilesFromFriends = getFilesFromFriends



