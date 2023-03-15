import os
import sqlite3
from sqlite3 import OperationalError


class MeetingManagement:
    """regelt de docenten enzo"""

    def __init__(self, db_file):
        self.db_file = db_file
        if not os.path.exists(self.db_file):
            raise FileNotFoundError(f"F in the chat for {db_file}")

    def add_meeting(self, json_meeting, meeting_students, meeting_students2):
        try:

            params_meeting = (
                json_meeting["name"], json_meeting["date"], json_meeting["start time"], json_meeting["end time"],
                json_meeting["location"], str(json_meeting["teacher"]), meeting_students)
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute(f"INSERT INTO meeting (naam, datum, start_tijd, eind_tijd, locatie, organisator, deelnemer)"
                           f"VALUES(?, date(?), ?, ?, ?, ?, ?)", params_meeting)
            conn.commit()

            cursor.execute(f"SELECT last_insert_rowid()")
            meetingid = cursor.fetchall()
            meetingid2 = str(meetingid).replace("(", "").replace(")", "").replace("[", "").replace("]", "").replace(",",
                                                                                                                    "")

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
                    "student": info[5],
                    "start_time": info[6],
                    "end_time": info[7]
                })
            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e
        return meeting_info

    def get_all_meetings(self):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute(f"SELECT * FROM meeting")
            meeting_all_info = cursor.fetchall()
            meeting_info = []
            for info in meeting_all_info:
                meeting_info.append({
                    "id": info[0],
                    "name": info[1],
                    "date": info[2],
                    "location": info[3],
                    "teacher": info[4],
                    "student": info[5],
                    "start_time": info[6],
                    "end_time": info[7]
                })
            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e
        return meeting_info
