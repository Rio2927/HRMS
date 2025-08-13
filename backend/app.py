# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from flask_sqlalchemy import SQLAlchemy

# app = Flask(__name__)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://Rohit2704:@localhost:5432/HRMS'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# CORS(app)  # Allow React to access API

# db = SQLAlchemy(app)

# class Task(db.Model):
#     __tablename__ = 'tasks'
#     id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     title = db.Column(db.String(200), nullable=False)
#     done = db.Column(db.Boolean, default=False)

# with app.app_context():
#     db.create_all()

# @app.route('/tasks', methods=['GET'])
# def get_tasks():
#     tasks = Task.query.all()
#     task_list = [{'id': task.id, 'title': task.title, 'done': task.done} for task in tasks]
#     return jsonify({"tasks": task_list})

# if __name__ == '__main__':
#     app.run(port=5000)


from flask import Flask, jsonify
import psycopg2

app = Flask(__name__)

# Database connection config
conn = psycopg2.connect(
    host="localhost",
    database="HRMS",
    user="postgres",       # adjust if different
    password="rohit"  # replace with your password
)

@app.route('/employees', methods=['GET'])
def get_employees():
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, department FROM company.employees")
    rows = cursor.fetchall()
    cursor.close()

    # Convert to list of dictionaries
    employees = [
        {"id": row[0], "name": row[1], "department": row[2]}
        for row in rows
    ]
    return jsonify(employees)

@app.route('/actors', methods=['GET'])
def actors():

    return jsonify("Working")

if __name__ == '__main__':
    app.run(debug=True)
