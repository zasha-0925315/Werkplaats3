import os
import sqlite3
from sqlite3 import OperationalError
from lib.db import Database

class MeetingManagement(Database):
    """regelt de docenten enzo"""

    def __init__(self, db_file):
        super().__init__(db_file)

    def add_meeting(self, meeting_name, meeting_datetime, meeting_location, meeting_teacher, meeting_students, meeting_students2):
        try:

            params_meeting = (meeting_name, meeting_datetime, meeting_location, meeting_teacher, meeting_students)
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute(f"INSERT INTO meeting (naam, datum, locatie, organisator, deelnemer)"
                           f"VALUES(?, datetime(?), ?, ?, ?)", params_meeting)
            conn.commit()

            cursor.execute(f"SELECT last_insert_rowid()")
            meetingid = cursor.fetchall()
            meetingid2 = str(meetingid).replace("(", "").replace(")", "").replace("[", "").replace("]", "").replace(",", "")
            print(meetingid2)

            for student in meeting_students2:
                student2 = str(student).replace("(", "").replace(")", "").replace(",", "")
                cursor.execute(f"INSERT INTO aanwezigheid (aanwezigheid, student, meeting) "
                               f"VALUES(0, ?, ?)", (student2, meetingid2))
            conn.commit()

            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e

    def get_meeting(self, meetingid):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute(f"SELECT * FROM meeting WHERE id = {meetingid}")
            meeting_db_info = cursor.fetchall()
            meeting_info = []
            for info in meeting_db_info:
                meeting_info.append({
                    "id": info[0],
                    "name": info[1],
                    "date": info[2],
                    "location": info[3],
                    "teacher": info[4],
                    "student": info[5]
                })
            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e
        return meeting_info
