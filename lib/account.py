import sqlite3
from sqlite3 import OperationalError
from lib.db import Database

class AccountManagement(Database):
    """regelt de account enzo"""

    def __init__(self, db_file):
        super().__init__(db_file)

    def create_account(self, email, wachtwoord, docent, admin):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute("INSERT INTO login (email, wachtwoord, docent, is_admin) VALUES (?, ?, ?, ?)", [email, wachtwoord, docent, admin])
            conn.commit() 

            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e

    def get_account_detail(self, id):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute(f"SELECT * FROM login WHERE id = ?", [id])
            account = cursor.fetchone()
            
            conn.commit()
            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e
        return account

    def get_account_json(self):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()
            cursor.row_factory = sqlite3.Row  # geen idee wat dit is, but whatever works

            cursor.execute(f"SELECT id, email, docent, is_admin FROM login")
            account = cursor.fetchall()
            
            account_list = []
            for accounts in account:
                account_list.append({a: accounts[a] for a in accounts.keys()})

            conn.commit()
            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e
        return account_list

    def update_account(self, email, wachtwoord, docent, admin, id):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute(f"UPDATE login SET email = ?, wachtwoord = ?,docent = ?, is_admin = ? WHERE id = ?", [email, wachtwoord, docent, admin, id])
            conn.commit() 

            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e

    def delete_account(self, id):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute(f"DELETE FROM login WHERE id = ?", [id])
            conn.commit()

            #need to reset sqlite_sequence table bc user_id = autoincrement
            reset_seq_qry = "UPDATE 'sqlite_sequence' SET 'seq' = (SELECT MAX('id') FROM 'login') WHERE 'name' = 'login'"
            cursor.execute(reset_seq_qry)
            conn.commit() 

            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e