from flask import Flask, request, jsonify
import psycopg2
import psycopg2.extras

from models.employee import Employee
from models.department import Department
from models.hr_manager import HRManager
from models.payroll import Payroll
from models.db_models import EmployeeModel

app = Flask(__name__)

def get_conn():
    # Force IPv4 to avoid ::1/IPv6 pg_hba mismatch issues
    return psycopg2.connect(
        host="127.0.0.1",
        port=5432,
        dbname="postgres",      # or "hrms" if you created it
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






@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid JSON'}), 400

    name = data.get('name')
    email = data.get('email')

    if not name or not email:
        return jsonify({'error': 'Name and email required'}), 400

    try:
        with get_conn() as conn, conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            # ✅ Check if employee already exists
            cur.execute('SELECT * FROM public."HRMS" WHERE email = %s', (email,))
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
                    (name, email)
                )
                new_id = cur.fetchone()['id']
                conn.commit()

                return jsonify({
                    'msg': 'New employee created',
                    'employee_id': new_id,
                    'name': name,
                    'email': email
                }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500







if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
