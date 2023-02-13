import os
import sqlite3
from sqlite3 import OperationalError


class Login:
    """regelt login enzo"""

    def __init__(self, db_file):
        self.db_file = db_file
        if not os.path.exists(self.db_file):
            raise FileNotFoundError(f"F in the chat for {db_file}")

    def login(self, usn, pwd):
        try:
            conn = sqlite3.connect()
            cursor = conn.cursor()

            cursor.execute("SELECT * FROM login WHERE gebruikersnaam = ? AND wachtwoord = ?", usn, pwd)
            user = cursor.fetchone()
            conn.commit() 

            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e
