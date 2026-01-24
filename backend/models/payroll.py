"""Payroll business logic model."""
from typing import Optional, List
from datetime import datetime, date
from decimal import Decimal


class Payroll:
    """Payroll management class."""
    
    def __init__(self):
        """Initialize Payroll."""
        self.records: List[dict] = []
    
    def generate_payslip(
        self,
        employee_id: int,
        employee_name: str,
        month: date,
        base_salary: float,
        deductions: float = 0.0,
        allowances: float = 0.0
    ) -> dict:
        """
        Generate payslip for employee.
        
        Args:
            employee_id: Employee ID
            employee_name: Employee name
            month: Payroll month
            base_salary: Base salary
            deductions: Total deductions
            allowances: Total allowances
            
        Returns:
            Payslip dictionary
        """
        gross_salary = base_salary + allowances
        net_salary = gross_salary - deductions
        
        payslip = {
            'employee_id': employee_id,
            'employee_name': employee_name,
            'month': month.isoformat(),
            'base_salary': base_salary,
            'allowances': allowances,
            'gross_salary': gross_salary,
            'deductions': deductions,
            'net_salary': net_salary,
            'generated_at': datetime.now().isoformat()
        }
        
        self.records.append(payslip)
        return payslip
    
    def calculate_net_salary(
        self,
        base_salary: float,
        deductions: float = 0.0,
        allowances: float = 0.0,
        tax_rate: float = 0.0
    ) -> dict:
        """
        Calculate net salary with tax.
        
        Args:
            base_salary: Base salary
            deductions: Deductions
            allowances: Allowances
            tax_rate: Tax rate (as decimal, e.g., 0.1 for 10%)
            
        Returns:
            Salary breakdown dictionary
        """
        gross_salary = base_salary + allowances
        tax = gross_salary * tax_rate
        total_deductions = deductions + tax
        net_salary = gross_salary - total_deductions
        
        return {
            'base_salary': base_salary,
            'allowances': allowances,
            'gross_salary': gross_salary,
            'tax': tax,
            'deductions': deductions,
            'total_deductions': total_deductions,
            'net_salary': max(0, net_salary)
        }
    
    def get_payslips(self, employee_id: Optional[int] = None) -> List[dict]:
        """
        Get payslips.
        
        Args:
            employee_id: Filter by employee ID
            
        Returns:
            List of payslips
        """
        if employee_id:
            return [p for p in self.records if p['employee_id'] == employee_id]
        return self.records
    
    def __repr__(self) -> str:
        return f"<Payroll(records={len(self.records)})>"
