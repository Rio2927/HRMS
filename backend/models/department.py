"""Department business logic model."""
from typing import List, Optional
from datetime import datetime


class Department:
    """Department class for business logic operations."""
    
    def __init__(self, dept_id: int, dept_name: str, description: Optional[str] = None):
        """
        Initialize Department.
        
        Args:
            dept_id: Department ID
            dept_name: Department name
            description: Department description
        """
        self.dept_id = dept_id
        self.dept_name = dept_name
        self.description = description
        self.employees: List[dict] = []
        self.created_at = datetime.now()
    
    def add_employee(self, employee: dict) -> None:
        """
        Add employee to department.
        
        Args:
            employee: Employee dictionary or object
        """
        if isinstance(employee, dict):
            if employee not in self.employees:
                self.employees.append(employee)
        elif hasattr(employee, 'to_dict'):
            emp_dict = employee.to_dict()
            if emp_dict not in self.employees:
                self.employees.append(emp_dict)
    
    def remove_employee(self, emp_id: int) -> bool:
        """
        Remove employee from department.
        
        Args:
            emp_id: Employee ID
            
        Returns:
            True if removed, False if not found
        """
        original_len = len(self.employees)
        self.employees = [e for e in self.employees if e.get('emp_id') != emp_id]
        return len(self.employees) < original_len
    
    def list_employees(self) -> List[dict]:
        """Get all employees in department."""
        return self.employees
    
    def get_employee_count(self) -> int:
        """Get total number of employees."""
        return len(self.employees)
    
    def get_average_salary(self) -> float:
        """Calculate average salary in department."""
        if not self.employees:
            return 0.0
        total_salary = sum(e.get('salary', 0) for e in self.employees)
        return total_salary / len(self.employees)
    
    def to_dict(self) -> dict:
        """Convert to dictionary."""
        return {
            'dept_id': self.dept_id,
            'dept_name': self.dept_name,
            'description': self.description,
            'employee_count': self.get_employee_count(),
            'average_salary': self.get_average_salary(),
            'created_at': self.created_at.isoformat()
        }
    
    def __repr__(self) -> str:
        return f"<Department({self.dept_id}, {self.dept_name}, employees={self.get_employee_count()})>"
