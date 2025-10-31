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

import jwt
import datetime

import os
from dotenv import load_dotenv

load_dotenv()




app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

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


# Delete Employee
@app.route('/delete',methods=['POST'])
def delete():
    data = request.get_json()

    employeeID = data.get("id")    
    # first_name = data.get('first_name')
    # last_name = data.get('last_name')
    # password = data.get('password')

    try:
        # password_hash = generate_password_hash(password)
        # print("First Name : ",first_name)
        # print("Last Name  : ",last_name)
        # print("Hashed PW  : ",password_hash)

        # ✅ Save to PostgreSQL
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute('''
                DELETE FROM public.employees
                WHERE employee_id = %s
                RETURNING employee_id
            ''', (employeeID,))
            
            deleted = cur.fetchone()
            conn.commit()

    except Exception as e:
        import traceback
        print("Error occurred:", e)
        traceback.print_exc()   # ✅ Prints full stack trace
        return jsonify({"error": str(e)}), 500

    return jsonify({"success" : "true"})


# Create Employee
@app.route('/create',methods=['POST'])
def create():
    data = request.get_json()
    
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    password = data.get('password')
    email = data.get('email')

    try:
        password_hash = generate_password_hash(password)
        print("First Name : ",first_name)
        print("Last Name  : ",last_name)
        print("Hashed PW  : ",password_hash)

        # ✅ Save to PostgreSQL
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute('''
                INSERT INTO public.employees (first_name,last_name, password,email)
                VALUES (%s, %s,%s,%s)
                RETURNING employee_id
            ''', (first_name,last_name,password_hash,email))

            new_id = cur.fetchone()[0]
            conn.commit()

    except Exception as e:
        import traceback
        print("Error occurred:", e)
        traceback.print_exc()   # ✅ Prints full stack trace
        return jsonify({"error": str(e)}), 500

    return jsonify({"success" : "true"})

@app.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     if not data:
#         return jsonify({'error': 'Invalid JSON'}), 400

#     email = data.get('email')
#     password = data.get('password')

#     # print("Name : ",name)
#     # print("Email : ",email)

#     if not email or not password:
#         return jsonify({'error': 'Email and password required'}), 400

#     try:
#         with get_conn() as conn, conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
#             # ✅ Check if employee already exists
#             cur.execute('SELECT * FROM public.employees WHERE email = %s', (email,))
#             employee = cur.fetchone()
#             data = [dict(r) for r in employee]
#             print("Employee :: ",data)
#             print("Login API called")
#             if employee:
#                 return jsonify({
#                     'msg': 'Employee already exists',
#                     'employee_id': employee.get('id'),
#                     'name': employee.get('name'),
#                     'email': employee.get('email')
#                 }), 200
#             else:
#                 # ✅ Insert new employee if not exists
#                 # cur.execute(
#                 #     'INSERT INTO public."HRMS" (name, email) VALUES (%s, %s) RETURNING id',
#                 #     (name, password)
#                 # )
#                 # new_id = cur.fetchone()['id']
#                 # conn.commit()

#                 # return jsonify({
#                 #     'msg': 'New employee created',
#                 #     'employee_id': new_id,
#                 #     'name': name,
#                 #     'password': password
#                 # }), 201
#                 return jsonify({'success': False,'msg': 'Employee does not exist'})

#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

def login():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid JSON'}), 400

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password required'}), 400

    try:
        with get_conn() as conn, conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute('SELECT * FROM public.employees WHERE email = %s', (email,))
            employee = cur.fetchone()

            if not employee:
                return jsonify({'success': False, 'msg': 'Employee does not exist'}), 404

            # 🔐 Compare password hash
            stored_hash = employee.get('password')
            if not check_password_hash(stored_hash, password):
                return jsonify({'success': False, 'msg': 'Invalid password'}), 401

            if check_password_hash(stored_hash, password):
                # Generate token valid for 1 hour
                token = jwt.encode({
                    'employee_id': employee.get('id'),
                    'email': employee.get('email'),
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
                }, app.config['SECRET_KEY'], algorithm='HS256')

                return jsonify({
                    'success': True,
                    'msg': 'Login successful',
                    'token': token,
                    'employee_id': employee.get('id'),
                    'name': employee.get('name'),
                    'email': employee.get('email')
                }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500






if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
