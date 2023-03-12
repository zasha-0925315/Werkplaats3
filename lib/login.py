#import sqlite3
#from sqlite3 import OperationalError
from flask_sqlalchemy import SQLAlchemy
from flask_security import SQLAlchemyUserDatastore
from flask_security.models import fsqla_v2 as fsqla

#from lib.db import Database

DB = SQLAlchemy()
fsqla.FsModels.set_db_info(DB, user_table_name="gebruikers")

class User(DB.Model, fsqla.FsUserMixin):
     __tablename__ = "gebruikers"

class Role(DB.Model, fsqla.FsRoleMixin):
     pass

#class WebAuth(DB.Model, fsqla.FsWebAuthnMixin):
#     pass

datastore = SQLAlchemyUserDatastore(DB, User, Role)