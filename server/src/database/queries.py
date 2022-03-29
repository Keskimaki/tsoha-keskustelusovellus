"""Queries for PostgeSQL database"""

GET_POSTS_BY_THREAD_ID = """
    SELECT
        P.id, P.user_id, P.content, P.time, U.username, U.admin
    FROM
        Posts P, Users U
    WHERE
        P.user_id=U.id AND P.thread_id=%s;
"""
