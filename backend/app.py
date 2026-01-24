"""
HRMS Backend Application
Human Resource Management System API
"""
import os
import sys
import datetime

# Add backend directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from functools import wraps
from dotenv import load_dotenv
import psycopg2
import psycopg2.extras
from werkzeug.utils import secure_filename

# Import custom utilities
from utils.logger import get_logger
from utils.security import (
    token_required,
    generate_token,
    verify_token,
    hash_password,
    verify_password,
    SecurityError
)
from database.connection import get_db_connection, close_connection

load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-key-change-in-production')
app.config['MAX_CONTENT_LENGTH'] = int(os.getenv('MAX_FILE_SIZE_MB', 10)) * 1024 * 1024

# Initialize logging
logger = get_logger(__name__)

# Enable CORS with restrictions
allowed_origins = os.getenv('ALLOWED_ORIGINS', 'http://localhost:5173,http://localhost:3000').split(',')
CORS(app, 
     origins=allowed_origins,
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
     allow_headers=["Content-Type", "Authorization"],
     supports_credentials=True,
     max_age=3600
)

# File upload configuration
UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', 'uploads')
ALLOWED_EXTENSIONS = set(os.getenv('ALLOWED_FILE_EXTENSIONS', 'jpg,jpeg,png,pdf,docx').split(','))

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

logger.info("HRMS Backend Application initialized")


# ==================== HELPER FUNCTIONS ====================

def allowed_file(filename):
    """Check if file extension is allowed."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def get_conn():
    """Get database connection."""
    try:
        return get_db_connection()
    except Exception as e:
        logger.error(f"Database connection failed: {str(e)}")
        raise


# ==================== HEALTH CHECK ====================

@app.route("/ping", methods=["GET"])
def ping():
    """Health check endpoint."""
    return jsonify({"status": "ok", "message": "HRMS API is running"}), 200



# ==================== AUTHENTICATION ROUTES ====================

@app.route('/login', methods=['POST'])
def login():
    """
    Employee login endpoint.
    
    Expected JSON:
    {
        "email": "employee@example.com",
        "password": "password"
    }
    """
    try:
        data = request.get_json()
        
        if not data:
            logger.warning("Login attempt with invalid JSON")
            return jsonify({'error': 'Invalid JSON'}), 400

        email = data.get('email', '').strip()
        password = data.get('password', '')

        if not email or not password:
            logger.warning(f"Login attempt with missing credentials: {email}")
            return jsonify({'error': 'Email and password are required'}), 400

        conn = get_conn()
        try:
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                cur.execute('SELECT * FROM public.employees WHERE email = %s', (email,))
                employee = cur.fetchone()

                if not employee:
                    logger.warning(f"Login failed: employee not found - {email}")
                    return jsonify({'success': False, 'msg': 'Employee does not exist'}), 404

                # Verify password
                if not verify_password(employee.get('password'), password):
                    logger.warning(f"Login failed: invalid password - {email}")
                    return jsonify({'success': False, 'msg': 'Invalid password'}), 401

                # Generate token
                token = generate_token(
                    employee.get('employee_id'),
                    email,
                    hours=int(os.getenv('JWT_EXPIRATION_HOURS', 24))
                )

                logger.info(f"Login successful for employee: {email}")
                return jsonify({
                    'success': True,
                    'msg': 'Login successful',
                    'token': token,
                    'employee_id': employee.get('employee_id'),
                    'name': f"{employee.get('first_name', '')} {employee.get('last_name', '')}".strip(),
                    'email': employee.get('email'),
                    'avatar': employee.get('profile_image_url')
                }), 200

        finally:
            close_connection(conn)

    except SecurityError as e:
        logger.error(f"Security error during login: {str(e)}")
        return jsonify({'error': str(e)}), 401
    except Exception as e:
        logger.error(f"Login error: {str(e)}", exc_info=True)
        return jsonify({'error': 'Authentication failed'}), 500


# ==================== EMPLOYEE ROUTES ====================

@app.route('/employees', methods=['GET'])
@token_required
def get_employees(current_user):
    """Get all employees (requires authentication)."""
    try:
        conn = get_conn()
        try:
            with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cur:
                cur.execute('SELECT employee_id, first_name, last_name, email, department, salary FROM public.employees ORDER BY employee_id')
                rows = cur.fetchall()
                data = [dict(r) for r in rows]
                
                logger.info(f"Retrieved {len(data)} employees")
                return jsonify(data), 200
        finally:
            close_connection(conn)

    except Exception as e:
        logger.error(f"Error retrieving employees: {str(e)}", exc_info=True)
        return jsonify({"error": "Failed to retrieve employees"}), 500


@app.route('/employees/<int:employee_id>', methods=['GET'])
@token_required
def get_employee(current_user, employee_id):
    """Get single employee by ID."""
    try:
        conn = get_conn()
        try:
            with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cur:
                cur.execute('SELECT * FROM public.employees WHERE employee_id = %s', (employee_id,))
                employee = cur.fetchone()
                
                if not employee:
                    return jsonify({"error": "Employee not found"}), 404
                
                logger.info(f"Retrieved employee: {employee_id}")
                return jsonify(dict(employee)), 200
        finally:
            close_connection(conn)

    except Exception as e:
        logger.error(f"Error retrieving employee {employee_id}: {str(e)}", exc_info=True)
        return jsonify({"error": "Failed to retrieve employee"}), 500


@app.route('/create', methods=['POST'])
def create_employee():
    """
    Create new employee with optional file upload.
    
    Expected JSON:
    {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@example.com",
        "password": "securepassword",
        "department": "IT",
        "salary": 50000
    }
    """
    try:
        # Handle both JSON and form data
        if request.is_json:
            data = request.get_json()
        else:
            data = request.form.to_dict()

        first_name = data.get('first_name', '').strip()
        last_name = data.get('last_name', '').strip()
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        department = data.get('department', '').strip() or None
        salary = data.get('salary')

        # Validation
        if not all([first_name, last_name, email, password]):
            logger.warning("Create employee: missing required fields")
            return jsonify({'error': 'First name, last name, email, and password are required'}), 400

        if len(password) < 6:
            return jsonify({'error': 'Password must be at least 6 characters'}), 400

        # Convert salary to float
        if salary:
            try:
                salary = float(salary)
            except ValueError:
                return jsonify({'error': 'Invalid salary value'}), 400

        # Hash password
        try:
            password_hash = hash_password(password)
        except SecurityError as e:
            return jsonify({'error': str(e)}), 400

        # Handle file upload
        profile_image_url = None
        if 'file' in request.files:
            file = request.files['file']
            if file and file.filename != '' and allowed_file(file.filename):
                try:
                    # Create unique filename
                    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
                    extension = os.path.splitext(file.filename)[1]
                    new_filename = f"{email.split('@')[0]}_{timestamp}{extension}"
                    
                    filepath = os.path.join(UPLOAD_FOLDER, new_filename)
                    file.save(filepath)
                    profile_image_url = new_filename
                    logger.info(f"File uploaded: {new_filename}")
                except Exception as e:
                    logger.error(f"File upload failed: {str(e)}")
                    return jsonify({'error': 'File upload failed'}), 500
            elif file and not allowed_file(file.filename):
                return jsonify({'error': f'File type not allowed. Allowed types: {", ".join(ALLOWED_EXTENSIONS)}'}), 400

        # Create employee
        conn = get_conn()
        try:
            with conn.cursor() as cur:
                cur.execute('''
                    INSERT INTO public.employees (first_name, last_name, email, password, department, salary, profile_image_url)
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                    RETURNING employee_id
                ''', (first_name, last_name, email, password_hash, department, salary, profile_image_url))
                
                new_id = cur.fetchone()[0]
                conn.commit()
                
                logger.info(f"Employee created: {new_id} - {email}")
                return jsonify({
                    'success': True,
                    'message': 'Employee created successfully',
                    'employee_id': new_id
                }), 201

        finally:
            close_connection(conn)

    except Exception as e:
        logger.error(f"Error creating employee: {str(e)}", exc_info=True)
        return jsonify({'error': 'Failed to create employee'}), 500


@app.route('/employees/<int:employee_id>', methods=['PUT'])
@token_required
def update_employee(current_user, employee_id):
    """Update employee information."""
    try:
        data = request.get_json()
        
        # Validate employee exists
        conn = get_conn()
        try:
            with conn.cursor() as cur:
                cur.execute('SELECT employee_id FROM public.employees WHERE employee_id = %s', (employee_id,))
                if not cur.fetchone():
                    return jsonify({'error': 'Employee not found'}), 404
                
                # Build update query dynamically
                update_fields = []
                values = []
                
                for field in ['first_name', 'last_name', 'email', 'department', 'salary']:
                    if field in data and data[field] is not None:
                        update_fields.append(f"{field} = %s")
                        values.append(data[field])
                
                if not update_fields:
                    return jsonify({'error': 'No fields to update'}), 400
                
                values.append(employee_id)
                query = f"UPDATE public.employees SET {', '.join(update_fields)} WHERE employee_id = %s"
                
                cur.execute(query, values)
                conn.commit()
                
                logger.info(f"Employee updated: {employee_id}")
                return jsonify({'success': True, 'message': 'Employee updated successfully'}), 200

        finally:
            close_connection(conn)

    except Exception as e:
        logger.error(f"Error updating employee {employee_id}: {str(e)}", exc_info=True)
        return jsonify({'error': 'Failed to update employee'}), 500


@app.route('/employees/<int:employee_id>', methods=['DELETE'])
@token_required
def delete_employee(current_user, employee_id):
    """Delete an employee."""
    try:
        conn = get_conn()
        try:
            with conn.cursor() as cur:
                cur.execute('DELETE FROM public.employees WHERE employee_id = %s RETURNING employee_id', (employee_id,))
                deleted = cur.fetchone()
                
                if not deleted:
                    return jsonify({'error': 'Employee not found'}), 404
                
                conn.commit()
                logger.info(f"Employee deleted: {employee_id}")
                return jsonify({'success': True, 'message': 'Employee deleted successfully'}), 200

        finally:
            close_connection(conn)

    except Exception as e:
        logger.error(f"Error deleting employee {employee_id}: {str(e)}", exc_info=True)
        return jsonify({'error': 'Failed to delete employee'}), 500


# ==================== FILE SERVING ====================

@app.route('/uploads/<path:filename>', methods=['GET'])
def download_file(filename):
    """Download uploaded file."""
    try:
        # Prevent directory traversal
        filename = secure_filename(filename)
        return send_from_directory(UPLOAD_FOLDER, filename), 200
    except Exception as e:
        logger.error(f"Error serving file {filename}: {str(e)}")
        return jsonify({'error': 'File not found'}), 404


# ==================== ERROR HANDLERS ====================

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors."""
    logger.warning(f"404 error: {request.url}")
    return jsonify({'error': 'Endpoint not found'}), 404


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors."""
    logger.error(f"500 error: {str(error)}", exc_info=True)
    return jsonify({'error': 'Internal server error'}), 500


@app.errorhandler(413)
def request_entity_too_large(error):
    """Handle file too large errors."""
    max_size = os.getenv('MAX_FILE_SIZE_MB', 10)
    return jsonify({'error': f'File too large. Maximum size: {max_size}MB'}), 413


if __name__ == "__main__":
    debug_mode = os.getenv('FLASK_ENV') == 'development'
    logger.info(f"Starting HRMS Backend (Debug: {debug_mode})")
    app.run(host="0.0.0.0", port=5000, debug=debug_mode)
