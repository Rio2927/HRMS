class Employee:
    def __init__(self, emp_id, name, department, salary):
        self.emp_id = emp_id
        self.name = name
        self.department = department
        self.salary = salary
        self.attendance = []
        self.leaves = 0

    def mark_attendance(self, date):
        self.attendance.append(date)
        print(f"{self.name} marked present on {date}")

    def apply_leave(self, days):
        self.leaves += days
        print(f"{self.name} applied for {days} days of leave")

    def calculate_salary(self):
        deduction = self.leaves * 1000
        net_salary = self.salary - deduction
        return net_salary
