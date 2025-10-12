# # from flask import Flask, request, jsonify
# # from flask_cors import CORS
# # from flask_sqlalchemy import SQLAlchemy

# # app = Flask(__name__)

# # app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://Rohit2704:@localhost:5432/HRMS'
# # app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# # CORS(app)  # Allow React to access API

# # db = SQLAlchemy(app)

# # class Task(db.Model):
# #     __tablename__ = 'tasks'
# #     id = db.Column(db.Integer, primary_key=True, autoincrement=True)
# #     title = db.Column(db.String(200), nullable=False)
# #     done = db.Column(db.Boolean, default=False)

# # with app.app_context():
# #     db.create_all()

# # @app.route('/tasks', methods=['GET'])
# # def get_tasks():
# #     tasks = Task.query.all()
# #     task_list = [{'id': task.id, 'title': task.title, 'done': task.done} for task in tasks]
# #     return jsonify({"tasks": task_list})

# # if __name__ == '__main__':
# #     app.run(port=5000)


# from flask import Flask, jsonify
# import psycopg2

# app = Flask(__name__)

# # Database connection config
# # conn = psycopg2.connect(
# #     host="localhost",
# #     database="postgres",
# #     user="Test1",               # adjust if different
# #     password="Rohit@2704"       # replace with your password
# # )

# conn = psycopg2.connect(
#     host="localhost",
#     port=5432,
#     dbname="postgres",
#     user="Test1",
#     password=""
# )

# print("Connected")

# @app.route('/employees', methods=['GET'])
# def get_employees():
#     cursor = conn.cursor()
#     cursor.execute("SELECT id, name, department FROM company.employees")
#     rows = cursor.fetchall()
#     cursor.close()

#     # Convert to list of dictionaries
#     employees = [
#         {"id": row[0], "name": row[1], "department": row[2]}
#         for row in rows
#     ]
#     return jsonify(employees)

# @app.route('/actors', methods=['GET'])
# def actors():

#     return jsonify("Working")

# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask, request, jsonify
import psycopg2
import psycopg2.extras



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

    return jsonify({"msg": "Received Info"}), 401

# @app.route('/actors', methods=['GET'])
# def actors():
#     return jsonify("Working")

# if __name__ == '__main__':
#     app.run(debug=True)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
