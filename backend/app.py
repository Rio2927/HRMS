from flask import Flask, request, jsonify
import psycopg2
import psycopg2.extras

from models.employee import Employee
from models.department import Department
from models.hr_manager import HRManager
from models.payroll import Payroll
from models.db_models import EmployeeModel

from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash



app = Flask(__name__)

# Enable CORS for all routes and origins
CORS(app)

def get_conn():
    # Force IPv4 to avoid ::1/IPv6 pg_hba mismatch issues
    return psycopg2.connect(
        host="127.0.0.1",
        port=5432,
        dbname="HRMS",      # or "hrms" if you created it
        user="postgres",        # lowercase user we created
        password="Rohit@2704",
    )


@app.route("/ping", methods=["GET"])
def ping():
    return jsonify({"ok": True})

@app.route('/employees', methods=['GET'])
def get_employees():
    try:
        with get_conn() as conn, conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cur:
            # If your table is public.employees:
            cur.execute('SELECT * FROM public."HRMS"')
            rows = cur.fetchall()                                                   # List of DictRow objects
            print("Rows = ",rows)                                                   # [{'name': 'Alice', 'department': 'HR'},{'name': 'Bob', 'department': 'IT'}] aisa kuch output hoga
                                                                                    # Har row ko dict (JSON) me convert kar dega
                                                                                    # Dikhne me pure Python dictionary (JSON) = DictRow but not internally
            data = [dict(r) for r in rows]                                          # Har row ko JSON (dict in python) me convert karti hai
            # print("Data => ",data)                                                                          
        return jsonify(data)
    except Exception as e:
        # Return the error so you can see exact cause
        return jsonify({"error": str(e)}), 500



@app.route('/create',methods=['POST'])
def create():
    data = request.get_json()
    
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    password = data.get('password')

    try:
        password_hash = generate_password_hash(password)
        print("First Name : ",first_name)
        print("Last Name  : ",last_name)
        print("Hashed PW  : ",password_hash)

        # ✅ Save to PostgreSQL
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute('''
                INSERT INTO public.employees (first_name,last_name, password)
                VALUES (%s, %s,%s)
                RETURNING employee_id
            ''', (first_name,last_name,password_hash))

            new_id = cur.fetchone()[0]
            conn.commit()

    except Exception as e:
        import traceback
        print("Error occurred:", e)
        traceback.print_exc()   # ✅ Prints full stack trace
        return jsonify({"error": str(e)}), 500

    return jsonify({"success" : "true"})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid JSON'}), 400

    name = data.get('name')
    password = data.get('password')

    # print("Name : ",name)
    # print("Email : ",email)

    if not name or not password:
        return jsonify({'error': 'Name and email required'}), 400

    try:
        with get_conn() as conn, conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            # ✅ Check if employee already exists
            cur.execute('SELECT * FROM public."HRMS" WHERE password = %s', (password,))
            employee = cur.fetchone()
            print("Login API called")
            if employee:
                return jsonify({
                    'msg': 'Employee already exists',
                    'employee_id': employee.get('id'),
                    'name': employee.get('name'),
                    'email': employee.get('email')
                }), 200
            else:
                # ✅ Insert new employee if not exists
                cur.execute(
                    'INSERT INTO public."HRMS" (name, email) VALUES (%s, %s) RETURNING id',
                    (name, password)
                )
                new_id = cur.fetchone()['id']
                conn.commit()

                return jsonify({
                    'msg': 'New employee created',
                    'employee_id': new_id,
                    'name': name,
                    'password': password
                }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500







if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
