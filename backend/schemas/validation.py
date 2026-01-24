"""Validation schemas for API requests and responses."""
from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional
from datetime import datetime


class EmployeeLoginSchema(BaseModel):
    """Schema for employee login request."""
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=255)
    
    class Config:
        schema_extra = {
            "example": {
                "email": "john.doe@example.com",
                "password": "SecurePassword123"
            }
        }


class EmployeeCreateSchema(BaseModel):
    """Schema for creating a new employee."""
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=255)
    department: Optional[str] = None
    salary: Optional[float] = Field(None, ge=0)
    
    @validator('first_name', 'last_name')
    def validate_names(cls, v):
        if not v.strip():
            raise ValueError('Name cannot be empty')
        return v.strip()
    
    class Config:
        schema_extra = {
            "example": {
                "first_name": "John",
                "last_name": "Doe",
                "email": "john.doe@example.com",
                "password": "SecurePassword123",
                "department": "IT",
                "salary": 50000.0
            }
        }


class EmployeeUpdateSchema(BaseModel):
    """Schema for updating employee information."""
    first_name: Optional[str] = Field(None, min_length=1, max_length=100)
    last_name: Optional[str] = Field(None, min_length=1, max_length=100)
    email: Optional[EmailStr] = None
    department: Optional[str] = None
    salary: Optional[float] = Field(None, ge=0)
    
    class Config:
        schema_extra = {
            "example": {
                "first_name": "John",
                "department": "HR"
            }
        }


class EmployeeResponseSchema(BaseModel):
    """Schema for employee response."""
    employee_id: int
    first_name: str
    last_name: str
    email: str
    department: Optional[str] = None
    salary: Optional[float] = None
    created_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class LoginResponseSchema(BaseModel):
    """Schema for login response."""
    success: bool
    msg: str
    token: Optional[str] = None
    employee_id: Optional[int] = None
    name: Optional[str] = None
    email: Optional[str] = None
    avatar: Optional[str] = None


class DepartmentCreateSchema(BaseModel):
    """Schema for creating a department."""
    name: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = None
    
    class Config:
        schema_extra = {
            "example": {
                "name": "Human Resources",
                "description": "HR Department"
            }
        }


class LeaveRequestSchema(BaseModel):
    """Schema for leave requests."""
    employee_id: int
    start_date: datetime
    end_date: datetime
    reason: Optional[str] = None
    leave_type: str = Field(..., min_length=1)
    
    class Config:
        schema_extra = {
            "example": {
                "employee_id": 1,
                "start_date": "2024-01-20T00:00:00",
                "end_date": "2024-01-25T00:00:00",
                "reason": "Vacation",
                "leave_type": "Casual"
            }
        }


class AttendanceSchema(BaseModel):
    """Schema for attendance records."""
    employee_id: int
    attendance_date: datetime
    status: str = Field(..., regex="^(Present|Absent|Half-day)$")
    
    class Config:
        schema_extra = {
            "example": {
                "employee_id": 1,
                "attendance_date": "2024-01-20T00:00:00",
                "status": "Present"
            }
        }
