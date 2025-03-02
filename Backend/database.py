import os
import mysql.connector
from configparser import ConfigParser

config_path = os.path.join(os.path.dirname(__file__), "config.ini")

config = ConfigParser()
config.read(config_path)

if not config.sections():
    raise FileNotFoundError("Error: config.ini file not found or is empty!")

db_config = {
    "host": config.get("database", "HOST"),
    "port": config.getint("database", "PORT"),
    "user": config.get("database", "USER"),
    "password": config.get("database", "PASSWORD"),
    "database": config.get("database", "DATABASE"),
}

def get_db_connection():
    try:
        conn = mysql.connector.connect(**db_config)
        if conn.is_connected():
            print("Connected to MySQL database")
        return conn
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

get_db_connection()