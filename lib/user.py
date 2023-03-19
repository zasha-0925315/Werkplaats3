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

    def get_user_detail(self, id):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute(f"SELECT * FROM gebruikers WHERE gebruikersnaam = ?", [id])
            user = cursor.fetchone()
            
            conn.commit()
            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e
        return user

    def get_user_json(self):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()
            cursor.row_factory = sqlite3.Row  # geen idee wat dit is, but whatever works

            cursor.execute(f"SELECT user_id, gebruikersnaam, is_admin FROM gebruikers")
            user = cursor.fetchall()
            
            user_list = []
            for users in user:
                user_list.append({u: users[u] for u in users.keys()})

            conn.commit()
            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e
        return user_list

    def update_user(self, id):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute(f"SELECT * FROM gebruikers WHERE user_id = ?", [id])
            conn.commit() 

            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e

    def delete_user(self, id):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute(f"DELETE FROM gebruikers WHERE user_id = ?", [id])
            conn.commit()

            #need to reset sqlite_sequence table bc user_id = autoincrement
            reset_seq_qry = "UPDATE 'sqlite_sequence' SET 'seq' = (SELECT MAX('user_id') FROM 'gebruikers') WHERE 'name' = 'gebruikers'"
            cursor.execute(reset_seq_qry)
            conn.commit() 

            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e