from pydantic import BaseModel

class EmployeeCreate(BaseModel):
    name: str
    department: str
    salary: float
    password: str | None = None
