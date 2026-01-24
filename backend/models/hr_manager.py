"""HR Manager business logic model."""
from typing import Optional, List, Dict
from datetime import datetime
from enum import Enum


class LeaveStatus(str, Enum):
    """Leave request status enumeration."""
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    CANCELLED = "cancelled"


class HRManager:
    """HR Manager class for HR operations."""
    
    def __init__(self, manager_id: int, name: str, email: str):
        """
        Initialize HR Manager.
        
        Args:
            manager_id: Manager ID
            name: Manager name
            email: Manager email
        """
        self.manager_id = manager_id
        self.name = name
        self.email = email
        self.leave_requests: List[Dict] = []
        self.created_at = datetime.now()
    
    def approve_leave(
        self,
        leave_id: int,
        employee_id: int,
        employee_name: str,
        days: int,
        reason: str,
        leave_type: str = "Casual"
    ) -> Dict:
        """
        Approve leave request.
        
        Args:
            leave_id: Leave request ID
            employee_id: Employee ID
            employee_name: Employee name
            days: Number of days
            reason: Leave reason
            leave_type: Type of leave
            
        Returns:
            Leave request record
        """
        leave_record = {
            'leave_id': leave_id,
            'employee_id': employee_id,
            'employee_name': employee_name,
            'days': days,
            'reason': reason,
            'leave_type': leave_type,
            'status': LeaveStatus.APPROVED,
            'approved_by': self.name,
            'approved_at': datetime.now().isoformat()
        }
        self.leave_requests.append(leave_record)
        return leave_record
    
    def reject_leave(
        self,
        leave_id: int,
        employee_id: int,
        reason: str
    ) -> Dict:
        """
        Reject leave request.
        
        Args:
            leave_id: Leave request ID
            employee_id: Employee ID
            reason: Rejection reason
            
        Returns:
            Leave request record
        """
        leave_record = {
            'leave_id': leave_id,
            'employee_id': employee_id,
            'status': LeaveStatus.REJECTED,
            'rejection_reason': reason,
            'rejected_by': self.name,
            'rejected_at': datetime.now().isoformat()
        }
        self.leave_requests.append(leave_record)
        return leave_record
    
    def get_pending_leaves(self) -> List[Dict]:
        """Get all pending leave requests."""
        return [r for r in self.leave_requests if r.get('status') == LeaveStatus.PENDING]
    
    def get_leave_history(self, employee_id: Optional[int] = None) -> List[Dict]:
        """
        Get leave request history.
        
        Args:
            employee_id: Filter by employee ID
            
        Returns:
            List of leave requests
        """
        if employee_id:
            return [r for r in self.leave_requests if r.get('employee_id') == employee_id]
        return self.leave_requests
    
    def mark_attendance(
        self,
        employee_id: int,
        employee_name: str,
        date: datetime,
        status: str
    ) -> Dict:
        """
        Mark employee attendance.
        
        Args:
            employee_id: Employee ID
            employee_name: Employee name
            date: Attendance date
            status: Attendance status (Present, Absent, Half-day)
            
        Returns:
            Attendance record
        """
        attendance_record = {
            'employee_id': employee_id,
            'employee_name': employee_name,
            'date': date.isoformat(),
            'status': status,
            'recorded_by': self.name,
            'recorded_at': datetime.now().isoformat()
        }
        return attendance_record
    
    def generate_report(self, report_type: str = "employee_summary") -> Dict:
        """
        Generate HR report.
        
        Args:
            report_type: Type of report
            
        Returns:
            Report data
        """
        if report_type == "leave_summary":
            return {
                'total_requests': len(self.leave_requests),
                'approved': len([r for r in self.leave_requests if r.get('status') == LeaveStatus.APPROVED]),
                'rejected': len([r for r in self.leave_requests if r.get('status') == LeaveStatus.REJECTED]),
                'pending': len([r for r in self.leave_requests if r.get('status') == LeaveStatus.PENDING])
            }
        return {}
    
    def to_dict(self) -> Dict:
        """Convert to dictionary."""
        return {
            'manager_id': self.manager_id,
            'name': self.name,
            'email': self.email,
            'leave_requests_count': len(self.leave_requests),
            'created_at': self.created_at.isoformat()
        }
    
    def __repr__(self) -> str:
        return f"<HRManager({self.manager_id}, {self.name}, {self.email})>"
