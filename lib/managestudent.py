import os
import sqlite3
from sqlite3 import OperationalError


class StudentManagement:
    """regelt de studenten enzo"""

    def __init__(self, db_file):
        self.db_file = db_file
        if not os.path.exists(self.db_file):
            raise FileNotFoundError(f"F in the chat for {db_file}")

    def get_student(self):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute("SELECT * FROM student")
            student = cursor.fetchall()
            conn.commit() 

            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e
        return student

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