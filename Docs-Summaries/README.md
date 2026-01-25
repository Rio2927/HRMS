"# HRMS - Human Resource Management System

A comprehensive web-based HRMS platform built with Flask backend and React frontend. This system manages employees, departments, payroll, leaves, and attendance.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Setup](#database-setup)
- [Deployment](#deployment)
- [Security](#security)
- [Contributing](#contributing)

## Features

- **Employee Management**: Create, read, update, and delete employee records
- **Authentication**: JWT-based secure authentication
- **Department Management**: Organize employees by departments
- **Payroll System**: Manage salaries and payroll calculations
- **Leave Management**: Track and manage employee leaves
- **Attendance**: Maintain employee attendance records
- **File Upload**: Support for employee profile images and documents
- **Role-based Access**: Secure endpoints with authentication
- **Responsive UI**: React-based modern frontend

## Tech Stack

### Backend
- **Framework**: Flask 3.0.0
- **Database**: PostgreSQL
- **Authentication**: JWT (PyJWT 2.8.1)
- **ORM**: SQLAlchemy 2.0.23
- **Security**: Werkzeug (password hashing)

### Frontend
- **Framework**: React 19.1.0
- **Routing**: React Router DOM 7.6.3
- **UI Library**: Material-UI (MUI) 7.1.2
- **HTTP Client**: Axios 1.10.0
- **Build Tool**: Vite 6.3.5
- **Calendar**: FullCalendar 6.1.19

## Project Structure

```
HRMS/
├── backend/
│   ├── app.py                 # Main Flask application
│   ├── requirements.txt        # Python dependencies
│   ├── database/
│   │   └── connection.py       # Database configuration
│   ├── models/
│   │   ├── employee.py
│   │   ├── department.py
│   │   ├── payroll.py
│   │   └── db_models.py        # SQLAlchemy models
│   ├── schemas/
│   │   ├── validation.py       # Pydantic validation schemas
│   │   └── auth_schema.py
│   ├── utils/
│   │   ├── security.py         # JWT and password utilities
│   │   ├── logger.py           # Logging configuration
│   │   └── common.py
│   ├── tests/
│   │   ├── test_auth.py
│   │   ├── test_employee.py
│   │   └── test_department.py
│   ├── uploads/                # File upload directory
│   └── logs/                   # Application logs
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   ├── layout.jsx
│   │   │   ├── sidebar.jsx
│   │   │   ├── navbar.jsx
│   │   │   ├── protectedRoute.jsx
│   │   │   └── main-body/      # Feature components
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   └── CreateEmployee.jsx
│   │   └── context/
│   │       ├── AuthContext.jsx
│   │       └── AuthProvider.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
├── .github/
│   └── workflows/
│       └── main.yml            # CI/CD pipeline
├── .env.example                # Environment variables template
└── README.md
```

## Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL 12+
- npm or yarn package manager

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd HRMS
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install
```

## Configuration

### Environment Variables

Create a `.env` file in the `backend` directory based on `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Database Configuration
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=HRMS
DB_USER=postgres
DB_PASSWORD=your_secure_password

# JWT Configuration
SECRET_KEY=your_super_secret_key_change_this_in_production
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24

# Flask Configuration
FLASK_ENV=development
DEBUG=False
LOG_LEVEL=INFO

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# File Upload Configuration
UPLOAD_FOLDER=uploads
MAX_FILE_SIZE_MB=10
ALLOWED_FILE_EXTENSIONS=jpg,jpeg,png,pdf,docx
```

### Database Setup

1. **Create PostgreSQL Database**:

```sql
CREATE DATABASE HRMS;
```

2. **Create Required Tables**:

```sql
-- Connect to HRMS database
\c HRMS;

-- Create employees table
CREATE TABLE public.employees (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    department VARCHAR(100),
    salary NUMERIC(10, 2),
    profile_image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create departments table
CREATE TABLE public.departments (
    department_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create leaves table
CREATE TABLE public.leaves (
    leave_id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL REFERENCES employees(employee_id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT,
    leave_type VARCHAR(50),
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create attendance table
CREATE TABLE public.attendance (
    attendance_id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL REFERENCES employees(employee_id),
    attendance_date DATE NOT NULL,
    status VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create payroll table
CREATE TABLE public.payroll (
    payroll_id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL REFERENCES employees(employee_id),
    month DATE NOT NULL,
    base_salary NUMERIC(10, 2),
    deductions NUMERIC(10, 2),
    net_salary NUMERIC(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_employees_email ON employees(email);
CREATE INDEX idx_leaves_employee_id ON leaves(employee_id);
CREATE INDEX idx_attendance_employee_id ON attendance(employee_id);
CREATE INDEX idx_payroll_employee_id ON payroll(employee_id);
```

## Running the Application

### Development Mode

#### Terminal 1 - Backend

```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python app.py
```

The backend will run on `http://localhost:5000`

#### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

### Production Mode

#### Backend with Gunicorn

```bash
cd backend
gunicorn --bind 0.0.0.0:5000 --workers 4 app:app
```

#### Frontend Build

```bash
cd frontend
npm run build
npm run preview
```

## API Documentation

### Authentication

#### Login

```
POST /login
Content-Type: application/json

{
  "email": "employee@example.com",
  "password": "password"
}

Response (200):
{
  "success": true,
  "msg": "Login successful",
  "token": "eyJ...",
  "employee_id": 1,
  "name": "John Doe",
  "email": "employee@example.com",
  "avatar": "filename.jpg"
}
```

### Employee Management

#### Get All Employees

```
GET /employees
Authorization: Bearer <token>

Response (200):
[
  {
    "employee_id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "department": "IT",
    "salary": 50000.00
  }
]
```

#### Get Single Employee

```
GET /employees/<employee_id>
Authorization: Bearer <token>

Response (200):
{
  "employee_id": 1,
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "department": "IT",
  "salary": 50000.00,
  "created_at": "2024-01-20T10:30:00"
}
```

#### Create Employee

```
POST /create
Content-Type: application/json

{
  "first_name": "Jane",
  "last_name": "Smith",
  "email": "jane@example.com",
  "password": "securepass123",
  "department": "HR",
  "salary": 60000.00
}

Response (201):
{
  "success": true,
  "message": "Employee created successfully",
  "employee_id": 2
}
```

#### Update Employee

```
PUT /employees/<employee_id>
Authorization: Bearer <token>
Content-Type: application/json

{
  "department": "Management",
  "salary": 65000.00
}

Response (200):
{
  "success": true,
  "message": "Employee updated successfully"
}
```

#### Delete Employee

```
DELETE /employees/<employee_id>
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Employee deleted successfully"
}
```

### File Upload

```
GET /uploads/<filename>

Returns the uploaded file
```

### Health Check

```
GET /ping

Response (200):
{
  "status": "ok",
  "message": "HRMS API is running"
}
```

## Security

This application implements several security measures:

1. **Password Security**
   - Passwords are hashed using Werkzeug's PBKDF2 algorithm
   - Minimum 6 characters required

2. **JWT Authentication**
   - All protected endpoints require valid JWT token
   - Tokens expire after 24 hours (configurable)
   - Tokens include employee ID and email

3. **CORS Protection**
   - Restricted to configured origins only
   - Prevents cross-origin attacks

4. **Input Validation**
   - All inputs validated with Pydantic schemas
   - Email format validation
   - File type restriction for uploads

5. **SQL Injection Prevention**
   - Uses parameterized queries
   - No string concatenation in SQL

6. **Environment Configuration**
   - Sensitive credentials stored in `.env` file
   - `.env` excluded from version control
   - Secret key in environment variable

## Deployment

### Using GitHub Actions

The project includes a CI/CD pipeline in `.github/workflows/main.yml` that:

1. Runs backend tests
2. Builds frontend
3. Deploys to server via SSH

Set up GitHub secrets:
- `SERVER_IP`: Your server IP address
- `SERVER_USER`: SSH username
- `SERVER_SSH_KEY`: SSH private key

### Manual Deployment

1. Pull latest code from main branch
2. Install dependencies
3. Run database migrations
4. Start backend with Gunicorn/systemd
5. Build and deploy frontend
6. Configure reverse proxy (Nginx/Apache)

## Testing

### Backend Tests

```bash
cd backend
pip install pytest pytest-cov
pytest tests/ -v
```

### Frontend Tests

```bash
cd frontend
npm run lint
```

## Logging

Logs are stored in `backend/logs/` directory with daily rotation.

- **Log Level**: Configured via `LOG_LEVEL` env variable
- **Format**: `YYYY-MM-DD HH:MM:SS - logger_name - LEVEL - message`
- **Retention**: 10 backup files per logger

## Troubleshooting

### Database Connection Failed

- Verify PostgreSQL is running
- Check DB credentials in `.env` file
- Ensure database `HRMS` exists

### Port Already in Use

- Backend: Change port in `app.py` or pass different port
- Frontend: Vite will automatically use next available port

### JWT Token Expired

- Token expires after configured hours (default 24)
- User needs to login again to get new token

### CORS Errors

- Add frontend URL to `ALLOWED_ORIGINS` in `.env`
- Restart backend after changing environment variables

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@hrms.com or open an issue on GitHub." 
