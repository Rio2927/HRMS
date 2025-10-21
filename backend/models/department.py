class Department:
    def __init__(self, dept_name):
        self.dept_name = dept_name
        self.employees = []

    def add_employee(self, employee):
        self.employees.append(employee)

    def list_employees(self):
        for emp in self.employees:
            print(f"{emp.emp_id} - {emp.name}")
