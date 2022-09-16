import os
import pymysql
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

MYSQL_URL = "mysql+pymysql://root:" + os.environ['HR_PASSWORD'] + "@localhost:3306/Semi1-Proyecto1?charset=utf8"
POOL_SIZE = 20
POOL_RECYCLE = 3600
POOL_TIMEOUT = 15
MAX_OVERFLOW = 2
CONNECT_TIMEOUT = 60
connect_args = {"connect_timeout": CONNECT_TIMEOUT}

# SQLALCHEMY_DB_URL = os.environ['SQLALCHEMY_DB_URL']
global engine, SessionLocal
try:
    engine = create_engine(MYSQL_URL, pool_size=POOL_SIZE, pool_recycle=POOL_RECYCLE,
                           pool_timeout=POOL_TIMEOUT, max_overflow=MAX_OVERFLOW,
                           connect_args=connect_args,
                           pool_pre_ping=True)


    SessionLocal = sessionmaker(autocommit=True, autoflush=True, bind=engine)
except Exception as ex:
    print("Error conectando a la base de datos : ", ex)

def get_db() -> Session:
    # global db
    global db
    try:
        db = SessionLocal()
        return db
    except Exception as ex:
        print("Error obteniendo sesión de la base de datos : ", ex)
        return None
    finally:
        db.close()





#
# class Database():
#     def __init__(self) -> None:
#         self.connection_is_active = False
#         self.engine = None
#
#     def get_db_connection(self):
#         if self.connection_is_active == False:
#             connect_args = {"connect_timeout": CONNECT_TIMEOUT}
#             try:
#                 self.engine = create_engine(MYSQL_URL, pool_size=POOL_SIZE, pool_recycle=POOL_RECYCLE,
#                                             pool_timeout=POOL_TIMEOUT, max_overflow=MAX_OVERFLOW,
#                                             connect_args=connect_args)
#                 return self.engine
#             except Exception as ex:
#                 print("Error connecting to DB : ", ex)
#         return self.engine
#
#     def get_db_session(self, engine):
#         try:
#             Session = sessionmaker(bind=engine)
#             session = Session()
#             return session
#         except Exception as ex:
#             print("Error getting DB session : ", ex)
#             return None
