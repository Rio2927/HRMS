"""SQLAlchemy database models."""
from sqlalchemy import Column, Integer, String, Float, DateTime, Date, Text, ForeignKey, TIMESTAMP
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()


class EmployeeModel(Base):
    """Employee database model."""
    __tablename__ = "employees"
    
    employee_id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    department = Column(String(100))
    salary = Column(Float, default=0.0)
    profile_image_url = Column(String(255))
    created_at = Column(TIMESTAMP, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    leaves = relationship("LeaveModel", back_populates="employee", cascade="all, delete-orphan")
    attendance = relationship("AttendanceModel", back_populates="employee", cascade="all, delete-orphan")
    payroll = relationship("PayrollModel", back_populates="employee", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Employee(id={self.employee_id}, email={self.email}, name={self.first_name} {self.last_name})>"


class DepartmentModel(Base):
    """Department database model."""
    __tablename__ = "departments"
    
    department_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), unique=True, nullable=False)
    description = Column(Text)
    created_at = Column(TIMESTAMP, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f"<Department(id={self.department_id}, name={self.name})>"


class LeaveModel(Base):
    """Leave request database model."""
    __tablename__ = "leaves"
    
    leave_id = Column(Integer, primary_key=True, autoincrement=True)
    employee_id = Column(Integer, ForeignKey("employees.employee_id"), nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    reason = Column(Text)
    leave_type = Column(String(50), nullable=False)
    status = Column(String(20), default="pending")  # pending, approved, rejected
    created_at = Column(TIMESTAMP, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship
    employee = relationship("EmployeeModel", back_populates="leaves")
    
    def __repr__(self):
        return f"<Leave(id={self.leave_id}, employee_id={self.employee_id}, status={self.status})>"


class AttendanceModel(Base):
    """Attendance record database model."""
    __tablename__ = "attendance"
    
    attendance_id = Column(Integer, primary_key=True, autoincrement=True)
    employee_id = Column(Integer, ForeignKey("employees.employee_id"), nullable=False)
    attendance_date = Column(Date, nullable=False)
    status = Column(String(20), nullable=False)  # Present, Absent, Half-day
    created_at = Column(TIMESTAMP, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship
    employee = relationship("EmployeeModel", back_populates="attendance")
    
    def __repr__(self):
        return f"<Attendance(id={self.attendance_id}, employee_id={self.employee_id}, date={self.attendance_date})>"


class PayrollModel(Base):
    """Payroll database model."""
    __tablename__ = "payroll"
    
    payroll_id = Column(Integer, primary_key=True, autoincrement=True)
    employee_id = Column(Integer, ForeignKey("employees.employee_id"), nullable=False)
    month = Column(Date, nullable=False)
    base_salary = Column(Float, nullable=False)
    deductions = Column(Float, default=0.0)
    net_salary = Column(Float)
    created_at = Column(TIMESTAMP, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship
    employee = relationship("EmployeeModel", back_populates="payroll")
    
    def __repr__(self):
        return f"<Payroll(id={self.payroll_id}, employee_id={self.employee_id}, net_salary={self.net_salary})>"

