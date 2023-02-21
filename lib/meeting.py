import mysql.connector
from mysql.connector import errorcode

class MeetingManagement:
    """regelt de meetings enzo"""

    def __init__(self, conf):
        self.cnx = None
        self.cnx = mysql.connector.connect(**conf)

        try:
            cursor = self.cnx.cursor()
            cursor.execute()
            print()

        except mysql.connector.Error as e:
            if e.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("u done goofed")
            elif e.errno == errorcode.ER_BAD_DB_ERROR:
                print("F in the chat for the db")
            raise e

    def create_meeting(self):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute("")
            conn.commit() 

            conn.close()

        except mysql.connector.Error as e:
            print("yeet")
            raise e

    def get_meeting(self):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute("")
            conn.commit() 

            conn.close()

        except mysql.connector.Error as e:
            print("yeet")
            raise e

    def update_meeting(self):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute("")
            conn.commit() 

            conn.close()

        except mysql.connector.Error as e:
            print("yeet")
            raise e

    def delete_meeting(self):
        try:
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute("")
            conn.commit() 

            conn.close()

        except mysql.connector.Error as e:
            print("yeet")
            raise e