"""Queries for PostgreSQL database"""

GET_ALL_POSTS = """
    SELECT
        P.id, P.user_id, P.thread_id, P.content, P.edit, P.time, U.username, U.admin
    FROM
        Posts P, Users U
    WHERE
        P.user_id = U.id;
"""

GET_POSTS_BY_THREAD_ID = """
    SELECT
        P.id, P.user_id, P.content, P.time, P.edit, U.username, U.admin
    FROM
        Posts P, Users U
    WHERE
        P.user_id=U.id AND P.thread_id=%s;
"""

GET_POST_BY_ID = """
    SELECT
        P.id, P.user_id, P.thread_id, P.content, P.time, U.username, U.admin
    FROM
        Posts P, Users U
    WHERE
        P.user_id=U.id AND P.id=%s;
"""

GET_POSTS_BY_USER_ID = "SELECT * FROM Posts WHERE user_id=%s;"

CREATE_POST = "INSERT INTO Posts (user_id, thread_id, content) VALUES (%s, %s, %s);"

UPDATE_POST = "UPDATE Posts SET content=%s, edit=%s WHERE id=%s;"

DELETE_POST = "DELETE FROM Posts WHERE id=%s;"

GET_POST_BY_ID_AND_USER_ID = """
    SELECT * FROM Posts WHERE id=%s AND user_id=(SELECT id FROM Users WHERE username=%s);
"""
