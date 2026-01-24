"""Pytest configuration."""
import sys
import os

# Add backend directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest


@pytest.fixture
def sample_employee():
    """Sample employee fixture."""
    from models.employee import Employee
    return Employee(
        emp_id=1,
        first_name="John",
        last_name="Doe",
        email="john@example.com",
        department="IT",
        salary=50000.0
    )


@pytest.fixture
def sample_department():
    """Sample department fixture."""
    from models.department import Department
    return Department(
        dept_id=1,
        dept_name="IT",
        description="Information Technology"
    )
