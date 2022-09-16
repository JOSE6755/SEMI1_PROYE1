import hashlib
import os.path
from datetime import date, datetime

from sqlalchemy.orm import Session
from pathlib import Path


def getImagen(filename: str, url: str) -> str:
    ext = Path(filename.lower()).suffix
    if ext == '.jpg' or ext == '.jpeg' or \
            ext == '.bmp' or ext == '.png' or ext == '.svg':
        return url
    else:
        return ""


def getSearchFiles(username: str, search: str, db: Session
                   ) -> dict:
    query = """ select F.file_name,
       U2.username,
       F.url_bucket,
       DATE_FORMAT(F.edition_date, '%Y-%m%-%d %H:%i')  as "edition_date",
       DATE_FORMAT(F.creation_date, '%Y-%m%-%d %H:%i') as "creation_date"
from Friendship
         join User U on U.id_user = Friendship.id_user
         join File F on Friendship.id_friend = F.id_owner
         join User U2 on F.id_owner = U2.id_user
where U.username = :username
  and F.public = true and F.file_name like :search
  """
    results = db.execute(query, {'username': username.strip(), 'search': "%" + search + "%"})
    json = dict()
    resultsA = []
    for row in results:
        json['imagen'] = getImagen(row['file_name'], row['url_bucket'])
        json['nombre'] = row['file_name']
        json['url'] = row['url_bucket']
        json['fechaCreacion'] = row['creation_date']
        json['fechaEdicion'] = row['edition_date']
        json['propietario'] = row['username']
        json['ext'] = Path(row['file_name']).suffix.lower()
        resultsA.append(json)
        json = dict()

    if len(resultsA) != 0:
        return {
            "archivos": resultsA,
            "mensaje": "Se han encontrado archivos(s)"
        }
    else:
        return dict(archivos=resultsA, mensaje="Error no se han encontrado archivo(s)")


def getAllFilesFromFriends(username: str, db: Session) -> dict:
    query = """
    select F.file_name,
       U2.username,
       F.url_bucket,
       DATE_FORMAT(F.edition_date, '%Y-%m%-%d %H:%i')  as "edition_date",
       DATE_FORMAT(F.creation_date, '%Y-%m%-%d %H:%i') as "creation_date"
from Friendship
         join User U on U.id_user = Friendship.id_user
         join File F on Friendship.id_friend = F.id_owner
         join User U2 on F.id_owner = U2.id_user
where U.username = :username
  and F.public = true  """

    results = db.execute(query, {"username": username.strip()})
    json = dict()
    resultsA = []
    for row in results:
        json['imagen'] = getImagen(row['file_name'], row['url_bucket'])
        json['nombre'] = row['file_name']
        json['url'] = row['url_bucket']
        json['fechaCreacion'] = row['creation_date']
        json['fechaEdicion'] = row['edition_date']
        json['propietario'] = row['username']
        json['ext'] = Path(row['file_name']).suffix.lower()
        resultsA.append(json)
        json = dict()

    if len(resultsA) != 0:
        return {
            "archivos": resultsA,
            "mensaje": "Se han encontrado archivos(s)"
        }
    else:
        return {
            "archivos": resultsA,
            "mensaje": "Error no se han encontrado archivo(s)"
        }


def getAllFilesUser(
        username: str, db: Session, public: bool
):
    username = username.strip()
    query = """select  id_file as 'id',
        file_name,
       username,
       DATE_FORMAT(edition_date, '%Y-%m%-%d')  as "edition_date",
       DATE_FORMAT(creation_date, '%Y-%m%-%d') as "creation_date",
       url_bucket
from File
         join User U on U.id_user = File.id_owner
where U.username = :username """

    result = db.execute(
        query + "and public = false"
        , {'username': username})
    json = dict()
    privFiles = []

    for row in result:
        json['id'] = row['id']
        json['name'] = row['file_name']
        json['propietario'] = row['username']

        json['ext'] = Path(row['file_name']).suffix.lower()
        json['fecha_creacion'] = row['creation_date']
        json['fecha_modificacion'] = row['edition_date']
        json['url'] = row['url_bucket']
        json['imagen'] = getImagen(row['file_name'], row['url_bucket'])
        privFiles.append(json)
        json = dict()

    result = db.execute(query + "and public = true", {'username': username})
    pubFiles = []

    for row in result:
        json['id'] = row['id']
        json['name'] = row['file_name']
        json['propietario'] = row['username']

        json['ext'] = Path(row['file_name']).suffix.lower()
        json['fecha_creacion'] = row['creation_date']
        json['fecha_modificacion'] = row['edition_date']
        json['url'] = row['url_bucket']
        json['imagen'] = getImagen(row['file_name'], row['url_bucket'])
        pubFiles.append(json)
        json = dict()

    query = """
    select avatar
from User
where username = :username
    """
    result = db.execute(query, {'username': username})
    avatar = ""
    for row in result:
        avatar = row['avatar']

    return {"userImage": avatar, "PubFiles": pubFiles, "privFiles": privFiles}


def addFriend(username: str, newFriend: str, db: Session) -> dict:
    query = """
    INSERT INTO Friendship(id_user, id_friend, date_added)
select *
from (
         SELECT User.id_user, U2.id_user as 'id_user2', :today
         from User
                  join User U2 on User.id_user <> U2.id_user
         where User.username = :username
           and U2.username = :newFriend
     ) as Temp where  NOT EXISTS(
         select  Friendship.id_user, Friendship.id_friend  from Friendship
         join User U on Friendship.id_user = U.id_user
         join User U2 on Friendship.id_friend = U2.id_user
         where  U.username = :username2 and U2.username = :newFriend2
    )
    """

    result = db.execute(query, {"username": username.strip(), "newFriend": newFriend.strip(),
                                "username2": username.strip(), "newFriend2": newFriend.strip(),
                                "today": datetime.now()})
    if result.rowcount == 0:
        return {"message": "Error al crear amistad, es probable que esta amistad ya exista"}
    else:
        return {"message": "Solicitud procesada correctamente"}


def findUser(search: str, db: Session) -> dict:
    query = """
    select username, avatar, count(F.id_owner) as count_files
from User
         left join File F on User.id_user = F.id_owner
where username like :search
  and (F.public <> false or F.public IS NULL)
group by User.id_user
    """

    result = db.execute(query, {"search": "%" + search + "%"})

    results = []
    json = dict()

    for row in result:
        json["username"] = row["username"]
        json["archivosPublicos"] = row["count_files"]
        json["avatar"] = row["avatar"]
        results.append(json)
        json = dict()

    if len(results) != 0:
        return {"resultados": results, "mensaje": "Usuario hallado"}
    else:
        return {"resultados": results, "mensaje": "Error Usuario no Hallado"}


def getAllUsers(username: str, db: Session) -> dict:
    query = """ select username, avatar, count(F.id_owner) as count_files
from User
    left  join File F on User.id_user = F.id_owner
where username <> :username and ( F.public <> false or F.public IS NULL)
group by User.id_user """

    results = db.execute(query, {"username": username})
    resultA = []
    json = dict()

    for row in results:
        json["username"] = row["username"]
        json["archivosPublicos"] = row["count_files"]
        json["avatar"] = row["avatar"]
        resultA.append(json)
        json = dict()

    if len(resultA) != 0:
        return {"usuarios": resultA}
    else:
        return {"usuarios": resultA}


def deleteGetFiles(username: str, db: Session) -> dict:
    query = """
    select file_name,
       U.username,
       IF(public <> 0, 'public', 'private')          as visibility,
       DATE_FORMAT(creation_date, '%Y-%m%-%d %H:%i') as "creation_date",
        url_bucket
from File
         join User U on U.id_user = File.id_owner
where U.username = :username """

    results = db.execute(query, {"username": username})

    resultA = []
    json = dict()
    for row in results:
        json["visibilidad"] = row["visibility"]
        json["name"] = row["file_name"]
        json["fecha"] = row["creation_date"]
        json["url"] = row["url_bucket"]
        json['imagen'] = getImagen(row['file_name'], row['url_bucket'])
        resultA.append(json)
        json = dict()
    return {"archivos": resultA}


def getFilesFromFriends(username: str, db: Session) -> dict:
    query = """
    select U2.username,
       F.file_name,
       DATE_FORMAT(F.creation_date, '%Y-%m%-%d %H:%i')
           as "creation_date",
       F.url_bucket
from Friendship
         join User U on U.id_user = Friendship.id_user
         join User U2 on U2.id_user = Friendship.id_friend
         join File F on Friendship.id_friend = F.id_owner
where U.username = :username
  and public = true 
    """
    results = db.execute(query, {"username": username})

    resultA = []
    json = dict()
    for row in results:
        json['imagen'] = getImagen(row['file_name'], row['url_bucket'])
        json["name"] = row["file_name"]
        json["propietario"] = row["username"]
        json["fecha"] = row["creation_date"]
        json["url"] = row["url_bucket"]
        resultA.append(json)
        json = dict()
    return {"archivos": resultA}


def editFile(nuevoNombre: str, archivo: str, nuevaVisibilidad: bool,
             usuario: str, visibility: bool, passw: str, db: Session) -> dict:
    query = """
    update File, User
join File F on User.id_user = F.id_owner
set F.file_name = :Nuevoarchivo, F.edition_date = :today, F.public = :isPublic
where User.username = :username and F.public = :visibility and 
F.file_name = :archivo and User.password = :passw
    """

    passw = hashlib.sha512(passw.encode('utf-8')).hexdigest()

    if Path(nuevoNombre).suffix == "":
        nuevoNombre = nuevoNombre + Path(archivo).suffix

    result = db.execute(query, {"Nuevoarchivo": nuevoNombre, "today": datetime.now(),
                                "isPublic": nuevaVisibilidad,
                                "username": usuario, "visibility": visibility,
                                "archivo": archivo, "passw": passw})

    if result.rowcount > 0:
        return {"message": "Archivo " + archivo + " editado correctamente"}
    else:
        return {"message": "Error: el archivo no se ha podido editar porque no existe el archivo: " +
                           archivo + " viculado al usuario: " + usuario + " con visibiliad: " + (
                               "public" if visibility else "private")}


def deleteFile(archivo: str,
               visibility: bool,
               usuario: str,
               passw: str, db: Session) -> dict:
    query = """
    delete
    from File
where file_name = :archivo
  and public = :visibility
  and id_owner in
      (select id_user from User where username = :user and password = :passw )
    """
    passw = hashlib.sha512(passw.encode('utf-8')).hexdigest()
    result = db.execute(query, {"archivo": archivo,
                                "visibility": visibility, "user": usuario,
                                "passw": passw})
    if result.rowcount > 0:
        return {"message": "Archivo " + archivo + " eliminado correctamente"}
    else:
        return {"message": "Error: el archivo no se ha podido eliminar porque no existe el archivo: " +
                           archivo + " viculado al usuario: " + usuario + " con visibiliad: " + (
                               "public" if visibility else "private")}


def uploadFile(fileName: str, visibility: bool, urlBucket: str, passw: str, user: str, db: Session) -> dict:
    query = """
    INSERT INTO File(id_owner, file_name, public,creation_date, edition_date, url_bucket )
SELECT id_user, :fileName, :visibility, :today, :today2, 
                :urlBucket from User where username = :user and password = :passW """

    passw = hashlib.sha512(passw.encode('utf-8')).hexdigest()
    today = datetime.now()

    result = db.execute(query, {"fileName": fileName, "visibility": visibility,
                                "today": today, "today2": today, "urlBucket": urlBucket,
                                "user": user.strip(), "passW": passw})
    if result.rowcount != 0:
        return {"message": "Archivo creado correctamente"}
    else:
        return {"message": "Combinación usuario y contraseña incorrectos"}


def loginUser(user: str, passw: str, db: Session) -> dict:
    passw = hashlib.sha512(passw.encode('utf-8')).hexdigest()
    query = """
    select  username from User
    where username = :user and password = :passw
    """

    result = db.execute(query, {"user": user, "passw": passw})
    arrayR = []
    for row in result:
        arrayR.append(row["username"])

    if len(arrayR) == 0:
        return {"message": "Combinación Username y/o contraseña Incorrecta, vuelva a intentarlo"}
    else:
        return {"message": "Inicio de sesión correcto, Bienvenido: " + arrayR[0], "user": user.strip()}

def registerUser( urlAvatar: str, correo: str, user: str, passw: str, db: Session) -> dict:
    passw = hashlib.sha512(passw.encode('utf-8')).hexdigest()
    query = """
    insert User( username, password, email, avatar )
    values ( :user , :passw , :correo , :urlAvatar )"""

    result = db.execute(query, {"user": user, "passw": passw, "correo": correo, "urlAvatar": urlAvatar})

    if result.rowcount == 0:
        return {"message": "Error en el registro no se ha podido consultar a la base de datos" }
    else:
        return {"message": "usuario creado corretamente"}