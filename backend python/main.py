from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from routes.User import user_router

app = FastAPI()

origins = ["*"]

## run: pipenv install
## pipenv shell
## python 3.8 main.py


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(user_router, prefix="/api/usuario" )
app.include_router(user_router, prefix="/api/user" )


if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=3000, reload=True)