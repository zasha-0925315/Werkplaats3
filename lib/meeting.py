import os
import sqlite3
from sqlite3 import OperationalError


class MeetingManagement:
    """regelt de docenten enzo"""

    def __init__(self, db_file):
        self.db_file = db_file
        if not os.path.exists(self.db_file):
            raise FileNotFoundError(f"F in the chat for {db_file}")

    def add_meeting(self, meeting_name, meeting_datetime, meeting_location, meeting_teacher, meeting_students):
        try:
            params = (meeting_name, meeting_datetime, meeting_location, meeting_teacher, meeting_students)
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute(f"INSERT INTO meeting (naam, datum, locatie, organisator, deelnemer) "
                           f"VALUES(?, datetime(?), ?, ?, ?)", params)
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
