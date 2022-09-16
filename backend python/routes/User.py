import base64
import json
import os
import random

import boto3
from pathlib import Path

from fastapi import APIRouter, UploadFile, Form, File

# from database.database import Database
from sqlalchemy.orm import Session
from fastapi.params import Depends

import controllers.User as User
from database.database import get_db
from models.User import FindFileModel, AddFriendModel, FindUserModel, DeleteGetFilesModel, EditFileModel, \
    DeleteFileModel, UploadFileModel

user_router = APIRouter(
    tags=["User"],
    responses={404: {"descripción": "No encontrado"}},
)


@user_router.get("/{username}")
def getAllFilesUser(username: str, db: Session = Depends(get_db)) -> dict:
    value = User.getAllFilesUser(username, db, True)
    return value


@user_router.post("/findFile")
def findFile(search: FindFileModel, db: Session = Depends(get_db)) -> dict:
    result = User.getSearchFiles(search.username, search.nombreArchivo, db)
    return result


@user_router.get("/seeAllFiles/{username}")
def getSeeAllFiles(username: str, db: Session = Depends(get_db)) -> dict:
    result = User.getAllFilesFromFriends(username, db)
    return result


@user_router.post("/addFriend")
def addFriend(addFriendR: AddFriendModel, db: Session = Depends(get_db)) -> dict:
    result = User.addFriend(addFriendR.username, addFriendR.newFriend, db)
    return result


@user_router.post("/findUser")
def findUser(seach: FindUserModel, db: Session = Depends(get_db)) -> dict:
    return User.findUser(seach.busqueda, db)


@user_router.get("/getAllUsers/{username}")
def getAllUsers(username: str, db: Session = Depends(get_db)) -> dict:
    return User.getAllUsers(username, db)


@user_router.post("/delete/getFiles")
def deleteGetFiles(user: DeleteGetFilesModel, db: Session = Depends(get_db)) -> dict:
    return User.deleteGetFiles(user.user, db)


@user_router.get("/getFilesFriends/{username}")
def getFilesFromFriends(username: str, db: Session = Depends(get_db)) -> dict:
    return User.getFilesFromFriends(username, db)


@user_router.post("/editFile")
def editFile(editReq: EditFileModel, db: Session = Depends(get_db)) -> dict:
    return User.editFile(editReq.nuevoNombre, editReq.archivo,
                         editReq.nuevaVisibilidad.strip().lower() == "public",
                         editReq.usuario, editReq.visibility.strip().lower() == "public",
                         editReq.passw, db)


@user_router.post("/deleteFile")
def deleteFile(deleteReq: DeleteFileModel, db: Session = Depends(get_db)) -> dict:
    return User.deleteFile(deleteReq.archivo,
                           deleteReq.visibility.strip().lower() == "public",
                           deleteReq.usuario,
                           deleteReq.passw,
                           db)
@user_router.post("/upload")
def uploadFile(file: UploadFile, info: str = Form(), db: Session = Depends(get_db)) -> dict:
    try:
        with open("uploads/"+file.filename, 'wb') as f:
            while contents := file.file.read(1024*1024):
                f.write(contents)
    except Exception:
        return {"message": "Error al subir el avatar"}
    finally:
        file.file.close()

    jsonDict = json.loads(info)
    #añadir al bucket
    ext = Path(file.filename.lower()).suffix
    if Path(jsonDict["filename"].lower()).suffix == "":
        jsonDict["filename"] = jsonDict["filename"] + ext

    key = os.environ['KEY']
    keySecret = os.environ['SECRET']
    s3 = boto3.resource('s3',
                        aws_access_key_id=key,
                        aws_secret_access_key=keySecret,
                        region_name="us-east-2")
    keyFile = str(random.randint(0,1000000)) +  file.filename
    s3.Bucket('appweb-grupo2-p1').upload_file("uploads/"+file.filename, keyFile )



    return User.uploadFile(jsonDict["filename"],
                           jsonDict["visibility"].lower().strip() == 'public',
                           "http://s3-us-east-2.amazonaws.com/appweb-grupo2-p1/" + keyFile,
                           jsonDict["pass"],
                           jsonDict["propietario"],
                           db)

@user_router.get("/login/{request64}")
def loginUser(request64: str, db: Session = Depends(get_db)) -> dict:
    decodedSTR = base64.b64decode(request64).decode('utf-8')
    jsonDict = json.loads(decodedSTR)
    return User.loginUser(jsonDict["user"].strip(), jsonDict["pass"], db)

@user_router.post("/registro")
def registerUser(imagen: UploadFile = File(...),info: str = Form(), db: Session = Depends(get_db)) -> dict:
    jsonDict = json.loads(info)
    try:
        with open("uploads/"+imagen.filename, 'wb') as f:
            while contents := imagen.file.read(1024*1024):
                f.write(contents)
    except Exception:
        return {"message": "Error al subir el avatar"}
    finally:
        imagen.file.close()

    # añadir al bucket
    key = os.environ['KEY']
    keySecret = os.environ['SECRET']
    s3 = boto3.resource('s3',
                        aws_access_key_id=key,
                        aws_secret_access_key=keySecret,
                        region_name="us-east-2")
    keyFile = str(random.randint(0, 1000000)) + imagen.filename
    s3.Bucket('appweb-grupo2-p1').upload_file("uploads/" + imagen.filename, keyFile)

    return User.registerUser("http://s3-us-east-2.amazonaws.com/appweb-grupo2-p1/" + keyFile,
                             jsonDict["correo"].strip() ,
                             jsonDict["user"].strip(), jsonDict["pass"], db )
