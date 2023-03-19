import os
import sqlite3
from sqlite3 import OperationalError

class CheckinManagement:
    """Wordt geregeld door docenten """

    def __init__(self, db_file):
        self.db_file = db_file
        if not os.path.exists(self.db_file):
            raise FileNotFoundError(f"F in the chat for {db_file}")

    def add_checkin(self, studentenid,result):
        try:

            params_checkin = (studentenid, result)
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute(f"INSERT INTO Vraagresultaten (studentenid, resultaat)"
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
    
    def post_answers(self, json_data):
            try:
             json_result = json_data["result"]
             json_student= json_data["student id"]
             json_meeting = int(json_data["meeting"])
             conn = sqlite3.connect(self.db_file)
             cursor = conn.cursor()

             cursor.execute(f"INSERT INTO vraagresultaten(studentid, resultaat, meeting)"
                            f"VALUES(?, ?, ?)", (json_student, json_result, json_meeting))
             conn.commit()
             conn.close()

            except OperationalError as e:
                print("yeet")
                raise e
    
    def patch_checkin(self, json_data):
            try:
             json_presence = json_data["presence"]
             json_student= json_data["student"]
             json_meeting = int(json_data["meeting"])
             json_checkintime = json_data["checkin time"]
             conn = sqlite3.connect(self.db_file)
             cursor = conn.cursor()

             cursor.execute(f"UPDATE aanwezigheid SET aanwezigheid = ?, check_in_tijd = ?"
                            f"WHERE student = ? AND meeting = ? ", (json_presence, json_checkintime, json_student, json_meeting))
             conn.commit()
             conn.close()

            except OperationalError as e:
                print("yeet")
                raise e
            
    def show_answers(self, meetingid):
            try:
             conn = sqlite3.connect(self.db_file)
             cursor = conn.cursor()

             cursor.execute(f"SELECT * FROM Vraagresultaten WHERE meeting = {meetingid}")
             results = cursor.fetchall()
             conn.commit()
             conn.close()

            except OperationalError as e:
                print("yeet")
                raise e       
            return results