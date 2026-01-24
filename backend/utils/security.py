"""Security utilities for authentication and password management."""
import jwt
import datetime
from functools import wraps
from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import os
from dotenv import load_dotenv

load_dotenv()


class SecurityError(Exception):
    """Custom exception for security errors."""
    pass


def get_secret_key():
    """Get JWT secret key from environment."""
    secret = os.getenv('SECRET_KEY')
    if not secret or secret == 'your_super_secret_key_change_this_in_production':
        raise SecurityError("SECRET_KEY not properly configured in environment variables")
    return secret


def generate_token(employee_id, email, hours=24):
    """
    Generate JWT token for employee.
    
    Args:
        employee_id: Employee ID
        email: Employee email
        hours: Token expiration time in hours (default: 24)
    
    Returns:
        JWT token string
        
    Raises:
        SecurityError: If SECRET_KEY is not configured
    """
    try:
        token = jwt.encode({
            'employee_id': employee_id,
            'email': email,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=hours)
        }, get_secret_key(), algorithm='HS256')
        return token
    except Exception as e:
        raise SecurityError(f"Failed to generate token: {str(e)}")


def verify_token(token):
    """
    Verify JWT token and return payload.
    
    Args:
        token: JWT token string
        
    Returns:
        Token payload dict
        
    Raises:
        SecurityError: If token is invalid or expired
    """
    try:
        payload = jwt.decode(token, get_secret_key(), algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        raise SecurityError("Token has expired")
    except jwt.InvalidTokenError:
        raise SecurityError("Invalid token")
    except Exception as e:
        raise SecurityError(f"Token verification failed: {str(e)}")


def token_required(f):
    """
    Decorator to protect routes with JWT token verification.
    
    Usage:
        @app.route('/protected')
        @token_required
        def protected_route(current_user):
            return jsonify({'user': current_user})
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        # Token from Authorization header
        if 'Authorization' in request.headers:
            try:
                token = request.headers['Authorization'].split(" ")[1]
            except IndexError:
                return jsonify({'error': 'Invalid Authorization header format'}), 401

        if not token:
            return jsonify({'error': 'Token is missing'}), 401

        try:
            data = verify_token(token)
            return f(data, *args, **kwargs)
        except SecurityError as e:
            return jsonify({'error': str(e)}), 401
        except Exception as e:
            return jsonify({'error': 'Authentication failed'}), 401

    return decorated


def hash_password(password):
    """Hash password for secure storage."""
    if not password or len(password) < 6:
        raise SecurityError("Password must be at least 6 characters long")
    return generate_password_hash(password)


def verify_password(password_hash, password):
    """Verify password against hash."""
    return check_password_hash(password_hash, password)
