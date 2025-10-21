from flask import Flask, request, jsonify
import psycopg2
import psycopg2.extras

from models.employee import Employee
from models.department import Department
from models.hr_manager import HRManager
from models.payroll import Payroll


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
            rows = cur.fetchall()
            print("Rows = ",rows)
            data = [dict(r) for r in rows]
            print("Data => ",data)
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

    print("Name = ",name)
    print("Email = ",email)

    return jsonify({"msg": "Received Info","name" : name,"email" : email}), 401






if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
