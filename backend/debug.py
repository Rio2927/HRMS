#!/usr/bin/env python
"""Debug script to check imports"""
import sys
import os

print(f"Current directory: {os.getcwd()}")
print(f"Python executable: {sys.executable}")
print(f"Python path: {sys.path}")

# Add the backend directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

print(f"Updated Python path: {sys.path}")

# Try importing
try:
    import utils
    print(f"✓ utils imported successfully")
    print(f"utils path: {utils.__file__}")
except Exception as e:
    print(f"✗ Failed to import utils: {e}")

try:
    from utils import logger
    print(f"✓ utils.logger imported successfully")
except Exception as e:
    print(f"✗ Failed to import utils.logger: {e}")

try:
    from utils.logger import get_logger
    print(f"✓ utils.logger.get_logger imported successfully")
    logger = get_logger(__name__)
    print(f"✓ Logger created successfully")
except Exception as e:
    print(f"✗ Failed: {e}")
    import traceback
    traceback.print_exc()
