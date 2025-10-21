from sqlalchemy import Column, Integer, String, Float
from database.connection import Base

class EmployeeModel(Base):
    __tablename__ = "employees"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    department = Column(String, nullable=False)
    salary = Column(Float, nullable=False)
    password = Column(String, nullable=True)
