"""Queries for PostgeSQL database"""

DROP_TABLES = """
    DROP TABLE IF EXISTS Posts;
    DROP TABLE IF EXISTS Threads;
    DROP TABLE IF EXISTS Boards;
    DROP TABLE IF EXISTS Users;
"""

# TODO time needs to store date as well
CREATE_USER_TABLE = """
    CREATE TABLE Users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        admin BOOLEAN DEFAULT FALSE,
        time TIME DEFAULT CURRENT_TIMESTAMP(0)
    );
    CREATE UNIQUE INDEX username_idx ON Users (username);
"""

# TODO Add individual users to private boards
CREATE_BOARD_TABLE = """
    CREATE TABLE Boards (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        description TEXT NOT NULL,
        private BOOLEAN DEFAULT FALSE,
        time TIME DEFAULT CURRENT_TIMESTAMP(0)
    );
"""

CREATE_THREAD_TABLE = """
    CREATE TABLE Threads (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES Users NOT NULL,
        board_id INTEGER REFERENCES Boards NOT NULL,
        name TEXT NOT NULL UNIQUE,
        closed BOOLEAN DEFAULT FALSE,
        time TIME DEFAULT CURRENT_TIMESTAMP(0)
    );
"""

# TODO Expand with more features? ~ editing, replies
CREATE_POST_TABLE = """
    CREATE TABLE Posts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES Users NOT NULL,
        thread_id INTEGER REFERENCES Threads NOT NULL,
        content TEXT NOT NULL,
        time TIME DEFAULT CURRENT_TIMESTAMP(0)
    );
"""
