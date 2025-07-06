from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)  # Allow React to access API

# Connect to MySQL
db = mysql.connector.connect(
    host="localhost",
    user="root",             # Replace with your user
    password="abc123",  # Replace with your password
    database="sakila"        # ✅ Your DB name
)

@app.route('/actors')
def get_actors():
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM actor")
    result = cursor.fetchall()
    return jsonify(result)

@app.route('/check-customer', methods=['POST'])
def check_customer():
    name = request.form.get('name')     # first name
    email = request.form.get('email')

    cursor = db.cursor(dictionary=True)
    query = """
        SELECT * FROM customer
        WHERE first_name = %s AND email = %s
    """
    cursor.execute(query, (name, email))
    result = cursor.fetchone()

    if result:
        return jsonify({"exists": True, "customer": result}), 200
    else:
        return jsonify({"exists": False, "message": "Customer not found"}), 404

if __name__ == '__main__':
    app.run(port=5000)
