import os
import sqlite3
from sqlite3 import OperationalError

class Database:
    """yo idek man. dit is de database gebeuren ayylmao"""

    def __init__(self, db_file):
        try:
           self.db_file = db_file
           
           if not os.path.exists(self.db_file):
            raise FileNotFoundError(f"F in the chat for {db_file}")
        except OperationalError as e:
            print(f"F in the chat for {db_file}")

            conn = sqlite3.connect(db_file)
            cursor = conn.cursor()
            cursor.execute(
                "CREATE TABLE IF NOT EXISTS demo_data(id INTEGER PRIMARY KEY AUTOINCREMENT, voornaam TEXT, achternaam TEXT)"
            )
                
            for pair in [
                ("test", "qwerty"),
                ("solid", "snake"),
                ("isaac", "clarke"),
                ("phoenix", "wright")
            ]:
                cursor.execute(
                    "INSERT INTO demo_data (voornaam, achternaam) VALUES (?, ?)", pair
                )

            conn.commit()
            conn.close()
            print("demo database created")

            raise e