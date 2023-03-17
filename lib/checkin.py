import os
import sqlite3
from sqlite3 import OperationalError

class CheckinManagement:
    """Wordt geregeld door docenten """

    def __init__(self, db_file):
        self.db_file = db_file
        if not os.path.exists(self.db_file):
            raise FileNotFoundError(f"F in the chat for {db_file}")

    def add_checkin(self, studentenid, classid, result):
        try:

            params_checkin = (studentenid, classid, result)
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute(f"INSERT INTO Vragen (studentenid, meeting, resultaat)"
                           f'VALUES(?, ?, ?)', params_checkin)
            conn.commit()

            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e
        
    # def get_checkins(self, vraag1,vraag2,vraag3):
    #     try:

    #         params_checkin = (vraag1, vraag2, vraag3 )
    #         conn = sqlite3.connect(self.db_file)
    #         cursor = conn.cursor()

    #         cursor.execute(f"meeting.student "
    #                        f"from aanwezigheid"
    #                        f""
    #         conn.commit()

    #         conn.close()

    #     except OperationalError as e:
    #         print("yeet")
    #         raise e
        

    def get_results(self):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute("SELECT * FROM vragen")
            results = cursor.fetchall()
            conn.commit() 

            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e

        return results
    
    def add_question(self, question):
        try:

            params_checkin = (question)
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute(f"INSERT INTO Vraagresultaten (vraag)"
                           f'VALUES(?)', params_checkin)
            conn.commit()

            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e
        
    def update_question(self, json_data):
            try:

             json_question = json_data["question"]
             json_meeting = int(json_data["meeting id"])
             conn = sqlite3.connect(self.db_file)
             cursor = conn.cursor()

             cursor.execute(f"UPDATE meeting SET vragen = ?"
                            f"WHERE id = ?", (json_question, json_meeting))
             conn.commit()
             conn.close()

            except OperationalError as e:
                print("yeet")
            raise e