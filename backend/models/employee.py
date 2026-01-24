"""Employee business logic model."""
from datetime import datetime
from typing import Optional, List


class Employee:
    """Employee class for business logic operations."""
    
    def __init__(
        self,
        emp_id: int,
        first_name: str,
        last_name: str,
        email: str,
        department: Optional[str] = None,
        salary: float = 0.0,
        profile_image_url: Optional[str] = None
    ):
        """
        Initialize Employee.
        
        Args:
            emp_id: Employee ID
            first_name: First name
            last_name: Last name
            email: Email address
            department: Department name
            salary: Monthly salary
            profile_image_url: Profile image URL
        """
        self.emp_id = emp_id
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.department = department
        self.salary = salary
        self.profile_image_url = profile_image_url
        self.attendance: List[datetime] = []
        self.leaves: int = 0
        self.created_at = datetime.now()
    
    @property
    def full_name(self) -> str:
        """Get full name."""
        return f"{self.first_name} {self.last_name}"
    
    def mark_attendance(self, date: datetime) -> None:
        """
        Mark employee as present on a date.
        
        Args:
            date: Attendance date
        """
        if date not in self.attendance:
            self.attendance.append(date)
    
    def apply_leave(self, days: int) -> None:
        """
        Apply for leave.
        
        Args:
            days: Number of days
        """
        if days > 0:
            self.leaves += days
    
    def calculate_salary(self, deduction_per_day: float = 1000.0) -> float:
        """
        Calculate net salary after leave deductions.
        
        Args:
            deduction_per_day: Daily deduction amount
            
        Returns:
            Net salary after deductions
        """
        deduction = self.leaves * deduction_per_day
        net_salary = self.salary - deduction
        return max(0, net_salary)
    
    def get_attendance_count(self) -> int:
        """Get total attendance count."""
        return len(self.attendance)
    
    def to_dict(self) -> dict:
        """Convert to dictionary."""
        return {
            'emp_id': self.emp_id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'full_name': self.full_name,
            'department': self.department,
            'salary': self.salary,
            'profile_image_url': self.profile_image_url,
            'leaves_applied': self.leaves,
            'attendance_count': self.get_attendance_count(),
            'created_at': self.created_at.isoformat()
        }
    
    def __repr__(self) -> str:
        return f"<Employee({self.emp_id}, {self.full_name}, {self.email})>"
