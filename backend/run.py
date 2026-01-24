#!/usr/bin/env python
"""Simple wrapper to run the Flask app"""
import sys
import os

# Ensure current directory is in path
backend_dir = os.path.dirname(os.path.abspath(__file__))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

# Set working directory
os.chdir(backend_dir)

# Now import and run the app
try:
    from app import app
    print(f"✓ Successfully imported Flask app")
    print(f"✓ Starting Flask server on http://0.0.0.0:5000")
    app.run(host='0.0.0.0', port=5000, debug=False)
except ImportError as e:
    print(f"✗ Failed to import app: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
