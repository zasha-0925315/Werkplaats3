import sqlite3
from sqlite3 import OperationalError
from lib.db import Database

class TeacherManagement(Database):
    """regelt de docenten enzo"""

    def __init__(self, db_file):
        super().__init__(db_file)

    def get_teacher(self):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute("SELECT * FROM docent")
            teacher = cursor.fetchall()
            conn.commit() 

            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e

        return teacher
    
    def get_teacher_json(self):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()
            cursor.row_factory = sqlite3.Row

            cursor.execute("SELECT * FROM docent")
            teacher = cursor.fetchall()

            t_list = []
            for teachers in teacher:
                t_list.append({t: teachers[t] for t in teachers.keys()})
            print(t_list)

            conn.commit() 

            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e

        return t_list
    
    def get_teacher_admin(self):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()
            cursor.row_factory = sqlite3.Row  # geen idee wat dit is, but whatever works

            cursor.execute(f"SELECT docent.id, docent.voornaam, docent.achternaam, docent.email, login.wachtwoord, login.is_admin "
                           f"FROM docent INNER JOIN login "
                           f"ON docent.id=login.docent")
            teacher = cursor.fetchall()

            t_list = []
            for teachers in teacher:
                t_list.append({t: teachers[t] for t in teachers.keys()})
            print(t_list)

            conn.commit()
            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e
        return t_list

    def add_teacher(self, voornaam, achternaam, email):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute("INSERT INTO docent (id, voornaam, achternaam, email) VALUES (?, ?, ?, ?)", [id, voornaam, achternaam, email])
            conn.commit() 

            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e

    def edit_teacher(self, voornaam, achternaam, email, id):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute(f"UPDATE docent SET voornaam = ?, achternaam = ?, email = ? WHERE id = ?", [voornaam, achternaam, email, id])
            conn.commit() 

            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e
    
    def delete_teacher(self, id):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute(f"DELETE FROM docent WHERE id = ?", [id])
            conn.commit() 

            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e