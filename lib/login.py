#import sqlite3
#from sqlite3 import OperationalError
#from lib.db import Database
from flask_sqlalchemy import SQLAlchemy
from flask_security import SQLAlchemyUserDatastore
from flask_security.models import fsqla_v2 as fsqla
from sqlalchemy.orm import relationship, backref
from sqlalchemy import Column, Integer, String, ForeignKey


DB = SQLAlchemy()
fsqla.FsModels.set_db_info(DB, user_table_name="gebruikers", role_table_name="rol")

class User(DB.Model, fsqla.FsUserMixin):
     __tablename__ = "gebruikers"
     id = Column(Integer(), primary_key=True)
     gebruikersnaam = Column(String(50), nullable=False)
     wachtwoord = Column(String(255), nullable=False)
     rollen = relationship('Role', secondary="gebruikerrol", backref=backref('gebruiker', lazy='dynamic'))

class Role(DB.Model, fsqla.FsRoleMixin):
     __tablename__ = "rol"
     id = Column(Integer(), primary_key=True)
     rol_type = Column(String(10))

class UserRole(DB.Model):
     __tablename__ = "gebruikerrol"
     id = Column(Integer(), primary_key=True)
     user_id = Column('gebruikers_id', Integer(), ForeignKey('gebruikers.id'))
     role_id = Column('rol_id', Integer(), ForeignKey('rol.id'))
     

#class WebAuth(DB.Model, fsqla.FsWebAuthnMixin):
#     pass

datastore = SQLAlchemyUserDatastore(DB, User, Role)