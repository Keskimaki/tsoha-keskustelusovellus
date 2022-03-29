"""Queries for PostgeSQL database"""

GET_ALL_POSTS = """
    SELECT
        P.id, P.user_id, P.thread_id, P.content, P.time, U.username, U.admin
    FROM
        Posts P, Users U
    WHERE
        P.user_id = U.id;
"""

GET_POSTS_BY_THREAD_ID = """
    SELECT
        P.id, P.user_id, P.content, P.time, U.username, U.admin
    FROM
        Posts P, Users U
    WHERE
        P.user_id=U.id AND P.thread_id=%s;
"""

GET_POSTS_BY_USER_ID = """
    SELECT * FROM Posts WHERE user_id=%s;
"""

GET_POST_BY_ID = """
    SELECT
        P.id, P.user_id, P.thread_id, P.content, P.time, U.username, U.admin
    FROM
        Posts P, Users U
    WHERE
        P.user_id=U.id AND P.id=%s;
"""
