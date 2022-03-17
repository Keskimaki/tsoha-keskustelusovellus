"""Helper functions for PostgreSQL database"""

import psycopg2

from config import DB_USERNAME, DB_PASSWORD

def get_db_connection():
    """Open database connection with user defined in .env"""
    conn = psycopg2.connect(
        host = "localhost",
        database = "tsoha",
        user = DB_USERNAME,
        password = DB_PASSWORD
    )

    return conn

def query_db(query, arguments=(), get_one=False):
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute(query, arguments)
    res = [ dict((cur.description[i][0], value) \
               for i, value in enumerate(row)) for row in cur.fetchall() ]

    cur.close()
    conn.close()

    return (res[0] if res else None) if get_one else res
