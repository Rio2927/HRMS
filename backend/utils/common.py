"""Common utility functions for the HRMS application."""
import os
import re
from datetime import datetime
from functools import wraps
from typing import Optional, Any, Dict, List


def validate_email(email: str) -> bool:
    """
    Validate email format.
    
    Args:
        email: Email address to validate
        
    Returns:
        True if valid, False otherwise
    """
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None


def validate_phone(phone: str) -> bool:
    """
    Validate phone number format.
    
    Args:
        phone: Phone number to validate
        
    Returns:
        True if valid, False otherwise
    """
    pattern = r'^[+]?[0-9\s\-()]{7,}$'
    return re.match(pattern, phone) is not None


def sanitize_string(value: str, max_length: int = 255) -> str:
    """
    Sanitize string input.
    
    Args:
        value: String to sanitize
        max_length: Maximum allowed length
        
    Returns:
        Sanitized string
    """
    if not isinstance(value, str):
        return ""
    return value.strip()[:max_length]


def format_currency(amount: float, currency: str = "USD") -> str:
    """
    Format amount as currency string.
    
    Args:
        amount: Amount to format
        currency: Currency code
        
    Returns:
        Formatted currency string
    """
    currency_symbols = {
        "USD": "$",
        "EUR": "€",
        "GBP": "£",
        "INR": "₹"
    }
    symbol = currency_symbols.get(currency, currency)
    return f"{symbol}{amount:,.2f}"


def get_pagination_params(page: Optional[int] = None, per_page: Optional[int] = None) -> Dict[str, int]:
    """
    Get pagination parameters with defaults.
    
    Args:
        page: Current page number (default: 1)
        per_page: Items per page (default: 20)
        
    Returns:
        Dictionary with offset and limit
    """
    page = max(1, page or 1)
    per_page = max(1, min(100, per_page or 20))  # Max 100 items per page
    
    return {
        'offset': (page - 1) * per_page,
        'limit': per_page,
        'page': page
    }


def calculate_age(birth_date: datetime) -> int:
    """
    Calculate age from birth date.
    
    Args:
        birth_date: Birth date as datetime object
        
    Returns:
        Age in years
    """
    today = datetime.today()
    age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
    return max(0, age)


def get_file_extension(filename: str) -> str:
    """
    Get file extension safely.
    
    Args:
        filename: Filename
        
    Returns:
        File extension (without dot) or empty string
    """
    if not filename or '.' not in filename:
        return ""
    return filename.rsplit('.', 1)[1].lower()


def is_file_allowed(filename: str, allowed_extensions: set) -> bool:
    """
    Check if file extension is allowed.
    
    Args:
        filename: Filename to check
        allowed_extensions: Set of allowed extensions (without dots)
        
    Returns:
        True if allowed, False otherwise
    """
    return get_file_extension(filename) in allowed_extensions


def get_env_bool(key: str, default: bool = False) -> bool:
    """
    Get boolean environment variable.
    
    Args:
        key: Environment variable name
        default: Default value
        
    Returns:
        Boolean value
    """
    value = os.getenv(key, str(default)).lower()
    return value in ('true', '1', 'yes', 'on')


def get_env_int(key: str, default: int = 0) -> int:
    """
    Get integer environment variable.
    
    Args:
        key: Environment variable name
        default: Default value
        
    Returns:
        Integer value
    """
    try:
        return int(os.getenv(key, default))
    except (ValueError, TypeError):
        return default


def format_date(date_obj: datetime, format_str: str = "%Y-%m-%d") -> str:
    """
    Format datetime object as string.
    
    Args:
        date_obj: Datetime object
        format_str: Format string
        
    Returns:
        Formatted date string
    """
    if not date_obj:
        return ""
    return date_obj.strftime(format_str)


def get_business_days_between(start_date: datetime, end_date: datetime) -> int:
    """
    Calculate business days between two dates.
    
    Args:
        start_date: Start date
        end_date: End date
        
    Returns:
        Number of business days (excluding weekends)
    """
    business_days = 0
    current_date = start_date
    
    while current_date <= end_date:
        if current_date.weekday() < 5:  # 0-4 are Mon-Fri
            business_days += 1
        current_date = current_date.replace(day=current_date.day + 1)
    
    return business_days
