import sqlite3
from sqlite3 import OperationalError
from lib.db import Database

class UserManagement(Database):
    """regelt de users enzo"""

    def __init__(self, db_file):
        super().__init__(db_file)

    def create_user(self):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute("")
            conn.commit() 

            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e

    def get_user(self):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute("")
            conn.commit() 

            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e

    def update_user(self):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute("")
            conn.commit() 

            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e

    def delete_user(self):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute("")
            conn.commit() 

            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e