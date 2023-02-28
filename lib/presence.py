import os
import sqlite3
from sqlite3 import OperationalError


class PresenceManagement:
    def __init__(self, db_file):
        self.db_file = db_file
        if not os.path.exists(self.db_file):
            raise FileNotFoundError(f"F in the chat for {db_file}")

    def get_presence(self, meetingid):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute(f"SELECT aanwezigheid.aanwezigheid, aanwezigheid.student, aanwezigheid.meeting, "
                           f"student.voornaam, student.achternaam "
                           f"FROM aanwezigheid INNER JOIN student "
                           f"ON aanwezigheid.student=student.id AND aanwezigheid.meeting IN ({meetingid})")
            presence_db_info = cursor.fetchall()
            conn.close()

            presence_info = []
            for info in presence_db_info:
                presence_info.append({
                    "presence": info[0],
                    "student": info[1],
                    "meeting": info[2],
                    "first name": info[3],
                    "last name": info[4]
                })
        except OperationalError as e:
            print("yeet")
            raise e
        return presence_info

    def patch_presence(self):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute(f"")
            presence_db_info = cursor.fetchall()
            conn.close()

            presence_info = []
            for info in presence_db_info:
                presence_info.append({
                    "presence": info[0],
                    "student": info[1],
                    "meeting": info[2],
                    "first name": info[3],
                    "last name": info[4]
                })
        except OperationalError as e:
            print("yeet")
            raise e
        return presence_info