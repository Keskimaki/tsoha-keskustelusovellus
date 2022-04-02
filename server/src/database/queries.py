"""Queries for PostgreSQL database"""

GET_ALL_POSTS = """
    SELECT
        P.id, P.user_id, P.thread_id, P.content, P.image, P.edit, P.time, U.username, U.admin
    FROM
        Posts P, Users U
    WHERE
        P.user_id = U.id;
"""

GET_POSTS_BY_THREAD_ID = """
    SELECT
        P.id, P.user_id, P.content, P.image, P.edit, P.time, U.username, U.admin
    FROM
        Posts P, Users U
    WHERE
        P.user_id=U.id AND P.thread_id=%s;
"""

GET_POSTS_BY_USER_ID = "SELECT * FROM Posts WHERE user_id=%s;"

GET_POST_BY_ID = """
    SELECT
        P.id, P.user_id, P.thread_id, P.content, P.image, P.edit, P.time, U.username, U.admin
    FROM
        Posts P, Users U
    WHERE
        P.user_id=U.id AND P.id=%s;
"""

CREATE_POST = "INSERT INTO Posts (user_id, thread_id, content) VALUES (%s, %s, %s);"

UPDATE_POST = "UPDATE Posts SET content=%s, edit=%s WHERE id=%s;"

DELETE_POST = "DELETE FROM Posts WHERE id=%s;"

GET_POST_BY_ID_AND_USER_ID = """
    SELECT * FROM Posts WHERE id=%s AND user_id=(SELECT id FROM Users WHERE username=%s);
"""

GET_ALL_THREADS = """
    SELECT
        T.id, T.user_id, T.board_id, T.name, T.closed, T.time, U.username, U.admin
    FROM
        Threads T, Users U
    WHERE
        T.user_id=U.id;
"""

GET_THREADS_BY_BOARD_ID = """
    SELECT
        T.id, T.user_id, T.board_id, T.name, T.closed, T.time, U.username, U.admin    
    FROM
        Threads T, Users U
    WHERE
        T.user_id=U.id AND T.board_id=%s;
"""

GET_THREADS_BY_USER_ID = "SELECT * FROM Threads WHERE user_id=%s;"

GET_THREAD_BY_ID = """
    SELECT
        T.id, T.user_id, T.board_id, T.name, T.closed, T.time, U.username, U.admin
    FROM
        Threads T, Users U
    WHERE
        T.user_id=U.id AND T.id=%s;
"""

GET_THREAD_ID_BY_NAME = "SELECT id FROM Threads WHERE name=%s;"

CREATE_THREAD = "INSERT INTO Threads (user_id, board_id, name) VALUES (%s, %s, %s);"

EDIT_THREAD_NAME = "UPDATE Threads SET name=%s WHERE id=%s;"

EDIT_THREAD_STATUS = "UPDATE Threads SET closed=%s WHERE id=%s;"

DELETE_THREAD = "DELETE FROM Threads WHERE id=%s;"

GET_THREAD_IF_ADMIN_OR_OWNER = """
    SELECT * FROM Threads WHERE id=%s AND user_id=
        (SELECT id FROM Users WHERE username=%s);
"""

GET_ALL_BOARDS = "SELECT * FROM Boards;"

GET_BOARD_BY_ID = "SELECT * FROM Boards WHERE id=%s;"

GET_BOARD_ID_BY_NAME = "SELECT id FROM Boards WHERE name=%s;"

CREATE_BOARD = "INSERT INTO Boards (name, description, private) VALUES (%s, %s, %s);"

EDIT_BOARD = "UPDATE Boards SET name=%s, description=%s, private=%s, access=%s WHERE id=%s;"

DELETE_BOARD = "DELETE FROM Boards WHERE id=%s;"

GET_USER_BY_ID = "SELECT * FROM Users WHERE id=%s;"

GET_USER_BY_USERNAME = "SELECT * FROM Users WHERE username=%s;"

GET_IMAGE_BY_POST_ID = "SELECT * FROM Images WHERE post_id=%s;"

ADD_IMAGE = "INSERT INTO Images (post_id, name, data) VALUES (%s, %s, %s);"

ADD_IMAGE_TO_POST = "UPDATE Posts SET image=true WHERE id=%s;"
