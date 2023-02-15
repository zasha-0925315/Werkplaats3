import os
import sqlite3
from sqlite3 import OperationalError


class AddMeeting:
    """regelt de docenten enzo"""

    def __init__(self, db_file):
        self.db_file = db_file
        if not os.path.exists(self.db_file):
            raise FileNotFoundError(f"F in the chat for {db_file}")

    def get_students_by_class(self, meeting_classes):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute(f"SELECT student.voornaam, student.achternaam "
                           f"FROM inschrijving INNER JOIN student "
                           f"ON inschrijving.student=student.id AND inschrijving.klas IN ({meeting_classes})")
            students = cursor.fetchall()
            conn.commit()

            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e
        return students

    def add_meeting(self, meeting_name, meeting_datetime, meeting_location, meeting_teacher, meeting_students):
        try:
            params = ("1", meeting_name, meeting_datetime, meeting_location, meeting_teacher, meeting_students)
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute(f"INSERT INTO meeting (id, naam, datum, locatie, organisator, deelnemer) "
                           f"VALUES(?, ?, ?, ?, ?, ?)", params)
            conn.commit()

            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e