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
                           f"aanwezigheid.afgemeld_reden, aanwezigheid.check_in_tijd,"
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
                    "afgemeld reason": info[3],
                    "check-in time": info[4],
                    "first name": info[5],
                    "last name": info[6]
                })
        except OperationalError as e:
            print("yeet")
            raise e
        return presence_info

    def update_presence(self, json_data):
        try:
            json_presence = json_data["presence"]
            json_reden = json_data["reason"]
            json_student = json_data["student"]
            json_meeting = json_data["meeting"]
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute(f"UPDATE aanwezigheid SET aanwezigheid = ?, afgemeld_reden = ? "
                           f"WHERE student = ? AND meeting = ?", (json_presence, json_reden, json_student, json_meeting))
            conn.commit()
            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e
