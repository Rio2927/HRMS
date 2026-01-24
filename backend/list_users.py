"""
List all users in the database.
"""
import os
from dotenv import load_dotenv
import psycopg2

# Load environment variables
load_dotenv()

# Database credentials
DB_HOST = os.getenv('DB_HOST', '127.0.0.1')
DB_PORT = int(os.getenv('DB_PORT', 5432))
DB_NAME = os.getenv('DB_NAME', 'HRMS')
DB_USER = os.getenv('DB_USER', 'postgres')
DB_PASSWORD = os.getenv('DB_PASSWORD', 'Rohit@2704')

try:
    conn = psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )
    cursor = conn.cursor()
    
    cursor.execute("SELECT employee_id, first_name, last_name, email, department, salary FROM employees")
    users = cursor.fetchall()
    
    print("\n" + "=" * 80)
    print("EXISTING USERS IN DATABASE")
    print("=" * 80)
    
    if not users:
        print("No users found in database.")
    else:
        print(f"\n{'ID':<5} {'First Name':<15} {'Last Name':<15} {'Email':<25} {'Department':<15} {'Salary':<10}")
        print("-" * 80)
        for user in users:
            emp_id, first, last, email, dept, salary = user
            print(f"{emp_id:<5} {first:<15} {last:<15} {email:<25} {dept or 'N/A':<15} ${salary or 0:.2f}")
    
    cursor.close()
    conn.close()
    
except Exception as e:
    print(f"Error: {e}")
