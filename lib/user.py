import os
import sqlite3
from sqlite3 import OperationalError


class UserManagement:
    """regelt de users enzo"""

    def __init__(self, db_file):
        self.db_file = db_file
        if not os.path.exists(self.db_file):
            raise FileNotFoundError(f"F in the chat for {db_file}")

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
