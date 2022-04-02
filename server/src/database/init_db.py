"""Initialize database"""

import sys
import os
# Allow imports from parent directory
sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))
#pylint: disable=wrong-import-position, import-error
from testing import insert_test_data
from database import schema
from services.db import get_db_connection

conn = get_db_connection()

cur = conn.cursor()

cur.execute(schema.DROP_TABLES)

cur.execute(schema.CREATE_USER_TABLE)
cur.execute(schema.CREATE_BOARD_TABLE)
cur.execute(schema.CREATE_THREAD_TABLE)
cur.execute(schema.CREATE_POST_TABLE)
cur.execute(schema.CREATE_IMAGE_TABLE)

insert_test_data(cur)

conn.commit()

cur.close()
conn.close()
