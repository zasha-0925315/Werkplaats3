import sqlite3
from sqlite3 import OperationalError
from lib.db import Database


class EnrollmentManagement(Database):
    """regelt de inschrijvingen enzo"""

    def __init__(self, db_file):
        super().__init__(db_file)
        
    def get_enrollment(self):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()
            cursor.row_factory = sqlite3.Row 

            cursor.execute(f"SELECT inschrijving.id, inschrijving.student, "
                           f"inschrijving.klas, student.voornaam, student.achternaam "
                           f"FROM inschrijving INNER JOIN student "
                           f"ON inschrijving.student=student.id")
            enrollment = cursor.fetchall()

            e_list = []
            for enrollments in enrollment:
                e_list.append({e: enrollments[e] for e in enrollments.keys()})
            print(e_list)

            conn.commit()
            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e
        return e_list
    
    def get_single_enrollment(self, id):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()
 
            cursor.execute(f"SELECT inschrijving.id, inschrijving.student, "
                           f"inschrijving.klas, student.voornaam, student.achternaam "
                           f"FROM inschrijving INNER JOIN student "
                           f"ON inschrijving.student=student.id "
                           "WHERE inschrijving.id = ?", [id])
            enrollment = cursor.fetchone()

            print(enrollment)

            conn.commit()
            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e
        return enrollment

    def add_enrollment(self, student, klas):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()
 
            cursor.execute(f"INSERT INTO inschrijving (klas, student) VALUES(?, ?)", [klas, student])

            conn.commit()
            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e

    def edit_enrollment(self, student, klas):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()
 
            cursor.execute(f"UPDATE inschrijving SET klas = ? WHERE student = ?", [klas, student])

            conn.commit()
            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e

    def delete_enrollment(self, id):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()
 
            cursor.execute(f"DELETE FROM inschrijving WHERE id = ?", [id])
  
            conn.commit()
            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e
