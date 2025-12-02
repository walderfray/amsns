from motor.motor_asyncio import AsyncIOMotorClient
from config.settings import get_settings
from utils.logging import init_logger

settings = get_settings()
logger = init_logger()

class Database:
    client: AsyncIOMotorClient = None

    async def connect_to_database(self):
        try:
            self.client = AsyncIOMotorClient(settings.db_url)
            # Ping the database to check if the connection is successful
            await self.client.admin.command('ping')
            logger.info("Connected to MongoDB")
        except Exception as e:
            logger.error(f"Error connecting to MongoDB: {e}")
            raise e

    async def close_database_connection(self):
        if self.client:
            self.client.close()
            logger.info("Closed MongoDB connection")

    def get_db(self):
        return self.client[settings.app_name]

db = Database()

async def get_database():
    return db.get_db()
