import os
import sqlite3
from sqlite3 import OperationalError

class CheckinManagement:
    """Wordt geregeld door docenten """

    def __init__(self, db_file):
        self.db_file = db_file
        if not os.path.exists(self.db_file):
            raise FileNotFoundError(f"F in the chat for {db_file}")

    def add_checkin(self, vraag1,vraag2,vraag3):
        try:

            params_checkin = (vraag1, vraag2, vraag3 )
            conn = sqlite3.connect(self.db_file)
            cursor = conn.cursor()

            cursor.execute(f"INSERT INTO Vragen (vraag1, vraag2, vraag3)"
                           f"VALUES(?, ?, ?)", params_checkin)
            conn.commit()

            conn.close()

        except OperationalError as e:
            print("yeet")
            raise e