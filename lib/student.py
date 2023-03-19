import sqlite3
from sqlite3 import OperationalError
from lib.db import Database

class StudentManagement(Database):
    """regelt de studenten enzo"""

    def __init__(self, db_file):
        super().__init__(db_file)
        
    def get_student(self):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute("SELECT * FROM student")
            students = cursor.fetchall()
            conn.commit() 

            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e
        return students
    
    def get_student_json(self):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()
            cursor.row_factory = sqlite3.Row  # geen idee wat dit is, but whatever works

            cursor.execute(f"SELECT student.id, student.voornaam, student.achternaam, inschrijving.klas "
                           f"FROM student INNER JOIN inschrijving "
                           f"ON student.id=inschrijving.student")
            student = cursor.fetchall()
            
            s_list = []
            for students in student:
                s_list.append({s: students[s] for s in students.keys()})

            conn.commit()
            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e
        return s_list

    def get_students_by_class(self, meeting_classes):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute(f"SELECT student.id "
                           f"FROM inschrijving INNER JOIN student "
                           f"ON inschrijving.student=student.id AND inschrijving.klas IN ({meeting_classes})")
            students = cursor.fetchall()
            conn.commit()

            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e
        return students
    
    def add_student(self):
        pass

    def edit_student(self):
        pass

    def delete_student(self):
        pass