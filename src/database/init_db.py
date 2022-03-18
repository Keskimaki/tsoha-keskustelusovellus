"""Initialize database"""

import sys
import os
# Allow imports from parent directory
sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))
#pylint: disable=wrong-import-position, import-error
import queries
from testing import insert_test_data
from services.db import get_db_connection

conn = get_db_connection()

cur = conn.cursor()

cur.execute(queries.DROP_TABLES)

cur.execute(queries.CREATE_USER_TABLE)
cur.execute(queries.CREATE_BOARD_TABLE)
cur.execute(queries.CREATE_THREAD_TABLE)
cur.execute(queries.CREATE_POST_TABLE)

insert_test_data(cur)

conn.commit()

cur.close()
conn.close()
