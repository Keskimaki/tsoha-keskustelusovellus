import psycopg2

conn = psycopg2.connect("dbname=tsoha user=miko")

cur = conn.cursor()

cur.execute("SELECT * FROM testi")

records = cur.fetchone()
