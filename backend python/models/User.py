from pydantic import BaseModel


class FindFileModel (BaseModel):
    username: str
    nombreArchivo: str

    class Config:
        schema_extra = {
            "exmaple": {
                "username": "user00",
                "nombreArchivo": "nombre_archivo.ext"
            }
        }

class AddFriendModel (BaseModel):
    username: str
    newFriend: str

    class Config:
        schema_extra = {
            "exmaple": {
                "username": "user00",
                "newFriend": "user01"
            }
        }

class FindUserModel (BaseModel):
    busqueda: str

    class Config:
        schema_extra = {
            "exmaple": {
                "busqueda": "user"
            }
        }

class DeleteGetFilesModel (BaseModel):
    user: str
    class Config:
        schema_extra = {
            "exmaple": {
                "user": "usuario01"
            }
        }

class EditFileModel (BaseModel):
    nuevoNombre: str
    archivo: str
    nuevaVisibilidad: str
    usuario : str
    visibility : str
    passw : str

    class Config:
        schema_extra = {
            "exmaple": {
                "nuevoNombre": "edited.pdf",
                "archivo": "old.pdf",
                "nuevaVisibilidad": "public | private",
                "usuario": "user",
                "visibility": "public | private",
                "passw": "123"
            }
        }
class DeleteFileModel (BaseModel):
    archivo: str
    visibility: str
    usuario: str
    passw: str
    class Config:
        schema_extra = {
            "exmaple": {
                "archivo": "old.pdf",
                "usuario": "user",
                "visibility": "public | private",
                "passw": "123"
            }
        }

class UploadFileModel (BaseModel):
    info: str

    class Config:
        schema_extra = {
            "exmaple": {
                "info": """ {  "propietario": "user",  
                "pass": "12345",  
                "visibility": "public",  
                "filename": "doc.pdf"} """,
            }
        }




