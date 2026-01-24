"""Check table structure and create demo user."""
import os
from dotenv import load_dotenv
import psycopg2
from werkzeug.security import generate_password_hash

load_dotenv()

conn = psycopg2.connect(
    host='127.0.0.1',
    port=5432,
    database='HRMS',
    user='postgres',
    password=os.getenv('DB_PASSWORD')
)
cur = conn.cursor()

# Get table structure
print("Checking employees table structure...")
cur.execute("SELECT column_name FROM information_schema.columns WHERE table_name = 'employees'")
columns = [row[0] for row in cur.fetchall()]
print(f"Columns: {columns}\n")

# Insert demo user with available columns
email = 'admin@hrms.com'
password = 'Admin@123456'
hashed = generate_password_hash(password)

try:
    cur.execute("SELECT employee_id FROM employees WHERE email = %s", (email,))
    if cur.fetchone():
        print(f"✓ User {email} already exists\n")
    else:
        cur.execute(
            "INSERT INTO employees (first_name, last_name, email, password) VALUES (%s, %s, %s, %s)",
            ('Admin', 'User', email, hashed)
        )
        conn.commit()
        print(f"✓ Demo user created successfully!\n")
        print("=" * 50)
        print("LOGIN CREDENTIALS")
        print("=" * 50)
        print(f"Email:    {email}")
        print(f"Password: {password}")
        print("=" * 50)
except Exception as e:
    print(f"Error: {e}")
finally:
    cur.close()
    conn.close()
