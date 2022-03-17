create_users_table = """
    CREATE TABLE Users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        admin BOOLEAN DEFAULT FALSE,
        time TIME DEFAULT CURRENT_TIMESTAMP(0)
    );
"""

create_boards_table = """
    CREATE TABLE Boards (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        private BOOLEAN DEFAULT FALSE,
        time TIME DEFAULT CURRENT_TIMESTAMP(0)
    );
"""

create_threads_table = """
    CREATE TABLE Threads (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES Users NOT NULL,
        board_id INTEGER REFERENCES Boards NOT NULL,
        name TEXT NOT NULL,
        closed BOOLEAN DEFAULT FALSE,
        time TIME DEFAULT CURRENT_TIMESTAMP(0)
    );
"""

# TODO Expand with more features? ~ editing, replies
create_posts_table = """
    CREATE TABLE Posts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES Users NOT NULL,
        thread_id INTEGER REFERENCES Threads NOT NULL,
        content TEXT NOT NULL,
        time TIME DEFAULT CURRENT_TIMESTAMP(0)
    );
"""
