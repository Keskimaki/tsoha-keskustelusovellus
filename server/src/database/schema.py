"""Schema for PostgreSQL database"""

DROP_TABLES = """
    DROP TABLE IF EXISTS Images;
    DROP TABLE IF EXISTS Posts;
    DROP TABLE IF EXISTS Threads;
    DROP TABLE IF EXISTS Boards;
    DROP TABLE IF EXISTS ProfilePictures;
    DROP TABLE IF EXISTS Users;
"""

CREATE_USER_TABLE = """
    CREATE TABLE Users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        admin BOOLEAN DEFAULT FALSE,
        time TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0)
    );
    CREATE UNIQUE INDEX username_idx ON Users (username);
"""

CREATE_BOARD_TABLE = """
    CREATE TABLE Boards (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        description TEXT NOT NULL,
        private BOOLEAN DEFAULT FALSE,
        access INTEGER[] DEFAULT '{}',
        time TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0)
    );
"""

CREATE_THREAD_TABLE = """
    CREATE TABLE Threads (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES Users NOT NULL,
        board_id INTEGER REFERENCES Boards NOT NULL,
        name TEXT NOT NULL UNIQUE,
        closed BOOLEAN DEFAULT FALSE,
        time TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0)
    );
    CREATE UNIQUE INDEX thread_name_idx ON Threads (name);
"""

CREATE_POST_TABLE = """
    CREATE TABLE Posts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES Users NOT NULL,
        thread_id INTEGER REFERENCES Threads NOT NULL,
        content TEXT NOT NULL,
        edit TIMESTAMP,
        image BOOLEAN DEFAULT FALSE,
        time TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0)
    );
"""

CREATE_IMAGE_TABLE = """
    CREATE TABLE Images (
        id SERIAL PRIMARY KEY,
        post_id INTEGER REFERENCES Posts NOT NULL,
        name TEXT NOT NULL,
        data BYTEA NOT NULL
    );
"""

CREATE_PROFILE_PICTURE_TABLE = """
    CREATE TABLE ProfilePictures (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES Users NOT NULL,
        name TEXT NOT NULL,
        data BYTEA NOT NULL
    );
"""
