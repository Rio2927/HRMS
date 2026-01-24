"""Database connection and session management."""
import os
from dotenv import load_dotenv
import psycopg2
import psycopg2.extras
from utils.logger import get_logger

load_dotenv()

logger = get_logger(__name__)


class DatabaseConfig:
    """Database configuration from environment variables."""
    
    def __init__(self):
        self.host = os.getenv('DB_HOST', '127.0.0.1')
        self.port = int(os.getenv('DB_PORT', 5432))
        self.database = os.getenv('DB_NAME', 'HRMS')
        self.user = os.getenv('DB_USER', 'postgres')
        self.password = os.getenv('DB_PASSWORD')
        
        # Validate required configuration
        if not self.password:
            raise ValueError("DB_PASSWORD environment variable is required")
    
    def get_connection(self):
        """Create and return a database connection."""
        try:
            conn = psycopg2.connect(
                host=self.host,
                port=self.port,
                database=self.database,
                user=self.user,
                password=self.password
            )
            logger.info("Database connection established successfully")
            return conn
        except psycopg2.DatabaseError as e:
            logger.error(f"Database connection failed: {str(e)}")
            raise


# Initialize database configuration
try:
    db_config = DatabaseConfig()
except ValueError as e:
    logger.error(f"Database configuration error: {str(e)}")
    raise


def get_db_connection():
    """Get a database connection with proper error handling."""
    try:
        return db_config.get_connection()
    except Exception as e:
        logger.error(f"Failed to get database connection: {str(e)}")
        raise


def close_connection(conn):
    """Close database connection safely."""
    try:
        if conn:
            conn.close()
            logger.debug("Database connection closed")
    except Exception as e:
        logger.error(f"Error closing database connection: {str(e)}")
