"""
Create demo user for testing the HRMS system.
"""
import os
import sys
from dotenv import load_dotenv
import psycopg2
from werkzeug.security import generate_password_hash

# Load environment variables
load_dotenv()

# Database credentials
DB_HOST = os.getenv('DB_HOST', '127.0.0.1')
DB_PORT = int(os.getenv('DB_PORT', 5432))
DB_NAME = os.getenv('DB_NAME', 'HRMS')
DB_USER = os.getenv('DB_USER', 'postgres')
DB_PASSWORD = os.getenv('DB_PASSWORD', 'Rohit@2704')

def create_demo_user():
    """Create a demo user in the database."""
    try:
        # Connect to database
        print(f"Connecting to database at {DB_HOST}:{DB_PORT}/{DB_NAME}...")
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD
        )
        cursor = conn.cursor()
        print("✓ Connected to database successfully!\n")
        
        # Demo user details
        first_name = "Admin"
        last_name = "User"
        email = "admin@hrms.com"
        password = "Admin@123456"
        hashed_password = generate_password_hash(password)
        department = "HR"
        salary = 50000.00
        
        # Check if user already exists
        check_sql = "SELECT * FROM employees WHERE email = %s"
        cursor.execute(check_sql, (email,))
        existing = cursor.fetchone()
        
        if existing:
            print(f"✗ User with email '{email}' already exists!")
            cursor.close()
            conn.close()
            return False
        
        # Insert demo user
        insert_sql = """
        INSERT INTO employees (first_name, last_name, email, password, department, salary)
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING employee_id
        """
        
        cursor.execute(insert_sql, (first_name, last_name, email, hashed_password, department, salary))
        employee_id = cursor.fetchone()[0]
        conn.commit()
        
        print("✓ Demo user created successfully!\n")
        print("=" * 50)
        print("DEMO USER CREDENTIALS")
        print("=" * 50)
        print(f"Employee ID: {employee_id}")
        print(f"First Name:  {first_name}")
        print(f"Last Name:   {last_name}")
        print(f"Email:       {email}")
        print(f"Password:    {password}")
        print(f"Department:  {department}")
        print(f"Salary:      ${salary:.2f}")
        print("=" * 50)
        print("\nYou can now login at http://localhost:5173/ with these credentials.")
        
        cursor.close()
        conn.close()
        return True
        
    except psycopg2.Error as e:
        print(f"✗ Database error: {str(e)}")
        if "does not exist" in str(e):
            print("\nThe 'employees' table does not exist yet.")
            print("Please run the SQL setup script first to create the tables.")
        return False
    except Exception as e:
        print(f"✗ Error: {str(e)}")
        return False

if __name__ == "__main__":
    success = create_demo_user()
    sys.exit(0 if success else 1)
