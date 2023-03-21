import sqlite3
from sqlite3 import OperationalError
from lib.db import Database

class EnrollmentManagement(Database):
    """regelt de inschrijvingen enzo"""

    def __init__(self, db_file):
        super().__init__(db_file)
        
    def get_enrollment(self):
        pass