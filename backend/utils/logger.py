"""Logging configuration for the application."""
import logging
import os
from logging.handlers import RotatingFileHandler
from datetime import datetime

# Create logs directory if it doesn't exist
LOGS_DIR = os.path.join(os.path.dirname(__file__), '..', 'logs')
os.makedirs(LOGS_DIR, exist_ok=True)


def get_logger(name, level=None):
    """
    Get a configured logger instance.
    
    Args:
        name: Logger name (typically __name__)
        level: Logging level (default: from LOG_LEVEL env var or INFO)
    
    Returns:
        Configured logger instance
    """
    logger = logging.getLogger(name)
    
    if logger.handlers:
        return logger
    
    # Determine log level
    log_level = os.getenv('LOG_LEVEL', 'INFO')
    if level:
        log_level = level
    
    logger.setLevel(getattr(logging, log_level))
    
    # File handler with rotation
    log_file = os.path.join(LOGS_DIR, f'app_{datetime.now().strftime("%Y%m%d")}.log')
    file_handler = RotatingFileHandler(
        log_file,
        maxBytes=10485760,  # 10MB
        backupCount=10
    )
    file_handler.setLevel(getattr(logging, log_level))
    
    # Console handler
    console_handler = logging.StreamHandler()
    console_handler.setLevel(getattr(logging, log_level))
    
    # Formatter
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )
    
    file_handler.setFormatter(formatter)
    console_handler.setFormatter(formatter)
    
    logger.addHandler(file_handler)
    logger.addHandler(console_handler)
    
    return logger