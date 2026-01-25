# HRMS API Documentation

Complete API reference for the HRMS backend.

## Base URL

```
http://localhost:5000  (Development)
https://yourdomain.com (Production)
```

## Authentication

All protected endpoints require JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `413` - Payload Too Large
- `500` - Internal Server Error

## Endpoints

### Health Check

#### GET /ping

Check if API is running.

**Request**
```bash
curl http://localhost:5000/ping
```

**Response (200)**
```json
{
  "status": "ok",
  "message": "HRMS API is running"
}
```

---

### Authentication

#### POST /login

Authenticate employee and receive JWT token.

**Request**
```bash
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword"
  }'
```

**Request Body**
```json
{
  "email": "string (required, valid email)",
  "password": "string (required, minimum 6 characters)"
}
```

**Response (200)**
```json
{
  "success": true,
  "msg": "Login successful",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "employee_id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "avatar": "profile_image.jpg"
}
```

**Response (404)**
```json
{
  "success": false,
  "msg": "Employee does not exist"
}
```

**Response (401)**
```json
{
  "success": false,
  "msg": "Invalid password"
}
```

---

### Employee Management

#### GET /employees

Get all employees.

**Request**
```bash
curl -X GET http://localhost:5000/employees \
  -H "Authorization: Bearer <token>"
```

**Response (200)**
```json
[
  {
    "employee_id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "department": "IT",
    "salary": 50000.00
  },
  {
    "employee_id": 2,
    "first_name": "Jane",
    "last_name": "Smith",
    "email": "jane@example.com",
    "department": "HR",
    "salary": 60000.00
  }
]
```

**Response (401)**
```json
{
  "error": "Token is missing"
}
```

---

#### GET /employees/{employee_id}

Get single employee by ID.

**Request**
```bash
curl -X GET http://localhost:5000/employees/1 \
  -H "Authorization: Bearer <token>"
```

**Response (200)**
```json
{
  "employee_id": 1,
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "department": "IT",
  "salary": 50000.00,
  "profile_image_url": "profile.jpg",
  "created_at": "2024-01-20T10:30:00"
}
```

**Response (404)**
```json
{
  "error": "Employee not found"
}
```

---

#### POST /create

Create new employee.

**Request**
```bash
curl -X POST http://localhost:5000/create \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Jane",
    "last_name": "Smith",
    "email": "jane@example.com",
    "password": "securepassword",
    "department": "HR",
    "salary": 60000.00
  }'
```

**Request Body**
```json
{
  "first_name": "string (required, max 100 chars)",
  "last_name": "string (required, max 100 chars)",
  "email": "string (required, valid email)",
  "password": "string (required, minimum 6 chars)",
  "department": "string (optional)",
  "salary": "number (optional, minimum 0)"
}
```

**Response (201)**
```json
{
  "success": true,
  "message": "Employee created successfully",
  "employee_id": 3
}
```

**Response (400)**
```json
{
  "error": "First name, last name, email, and password are required"
}
```

---

#### POST /create (with file upload)

Create employee with profile image.

**Request**
```bash
curl -X POST http://localhost:5000/create \
  -F "first_name=John" \
  -F "last_name=Doe" \
  -F "email=john@example.com" \
  -F "password=securepassword" \
  -F "department=IT" \
  -F "salary=50000" \
  -F "file=@/path/to/profile.jpg"
```

**Allowed File Types**
- jpg, jpeg, png, pdf, docx

**Maximum File Size**
- 10MB (configurable in .env)

**Response (201)**
```json
{
  "success": true,
  "message": "Employee created successfully",
  "employee_id": 3
}
```

**Response (400)**
```json
{
  "error": "File type not allowed. Allowed types: jpg, jpeg, png, pdf, docx"
}
```

---

#### PUT /employees/{employee_id}

Update employee information.

**Request**
```bash
curl -X PUT http://localhost:5000/employees/1 \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "department": "Management",
    "salary": 65000.00
  }'
```

**Request Body**
```json
{
  "first_name": "string (optional)",
  "last_name": "string (optional)",
  "email": "string (optional, valid email)",
  "department": "string (optional)",
  "salary": "number (optional)"
}
```

**Response (200)**
```json
{
  "success": true,
  "message": "Employee updated successfully"
}
```

**Response (404)**
```json
{
  "error": "Employee not found"
}
```

---

#### DELETE /employees/{employee_id}

Delete employee.

**Request**
```bash
curl -X DELETE http://localhost:5000/employees/1 \
  -H "Authorization: Bearer <token>"
```

**Response (200)**
```json
{
  "success": true,
  "message": "Employee deleted successfully"
}
```

**Response (404)**
```json
{
  "error": "Employee not found"
}
```

---

### File Management

#### GET /uploads/{filename}

Download uploaded file.

**Request**
```bash
curl -X GET http://localhost:5000/uploads/john.doe_20240120_103000.jpg \
  -o downloaded_file.jpg
```

**Response (200)**
- File content (binary data)

**Response (404)**
```json
{
  "error": "File not found"
}
```

---

## Error Handling

All endpoints return errors in the following format:

```json
{
  "error": "Error message describing what went wrong"
}
```

Common error messages:

- `Invalid JSON` - Request body is not valid JSON
- `Invalid Authorization header format` - Authorization header format is incorrect
- `Token is missing` - No token provided in Authorization header
- `Token has expired` - JWT token has expired
- `Invalid token` - JWT token is invalid or corrupted
- `Authentication failed` - General authentication error
- `Failed to retrieve employees` - Database query error
- `File too large. Maximum size: 10MB` - Uploaded file exceeds size limit

---

## Rate Limiting

Currently no rate limiting is implemented. For production, consider adding:
- 100 requests per minute per IP
- 1000 requests per hour per user

---

## Pagination

Future endpoint versions may support pagination:

```
GET /employees?page=1&per_page=20
```

---

## Versioning

API version is implicit (v1). Future versions may use:

```
GET /api/v2/employees
```

---

## CORS Headers

Request must include proper origin headers. Allowed origins configured in `.env`:

```
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

Response includes CORS headers:

```
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

## Examples

### Complete Login and Fetch Employees

```bash
#!/bin/bash

# 1. Login
LOGIN_RESPONSE=$(curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }')

TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

echo "Token: $TOKEN"

# 2. Fetch employees using token
curl -X GET http://localhost:5000/employees \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

### JavaScript/Axios Example

```javascript
import axios from 'axios';

const API_BASE = 'http://localhost:5000';

// Login
async function login(email, password) {
  try {
    const response = await axios.post(`${API_BASE}/login`, {
      email,
      password
    });
    
    const { token } = response.data;
    localStorage.setItem('token', token);
    
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response.data);
  }
}

// Get employees
async function getEmployees() {
  try {
    const token = localStorage.getItem('token');
    
    const response = await axios.get(`${API_BASE}/employees`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Failed to fetch employees:', error.response.data);
  }
}

// Create employee
async function createEmployee(employeeData) {
  try {
    const response = await axios.post(`${API_BASE}/create`, employeeData);
    return response.data;
  } catch (error) {
    console.error('Failed to create employee:', error.response.data);
  }
}
```

---

## Testing with Postman

1. Create Postman collection
2. Set collection variable: `BASE_URL` = `http://localhost:5000`
3. Add endpoints with proper headers and body
4. Use pre-request scripts to extract and store token
5. Share collection with team

Sample pre-request script for login:
```javascript
var jsonData = pm.response.json();
pm.environment.set("token", jsonData.token);
```

Use in subsequent requests:
```
Authorization: Bearer {{token}}
```

---

For more information, see the main [README.md](README.md).
