class HRManager:
    def __init__(self, name):
        self.name = name

    def approve_leave(self, employee, days):
        employee.apply_leave(days)
        print(f"{self.name} approved {days} days leave for {employee.name}")
