class Payroll:
    def __init__(self):
        self.records = []

    def generate_payslip(self, employee):
        salary = employee.calculate_salary()
        slip = f"Payslip for {employee.name}: ₹{salary}"
        self.records.append(slip)
        print(slip)
