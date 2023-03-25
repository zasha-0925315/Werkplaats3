import sqlite3
from sqlite3 import OperationalError
from lib.db import Database

class Login(Database):
    """regelt login enzo"""

    def __init__(self, db_file):
        super().__init__(db_file)

    def login_user(self, usn, pwd):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute("SELECT * FROM login WHERE gebruikersnaam = ? AND wachtwoord = ?", usn, pwd)
            user = cursor.fetchone()
            conn.commit() 

            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e
        return user