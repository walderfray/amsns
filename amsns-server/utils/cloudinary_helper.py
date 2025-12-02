import cloudinary
import cloudinary.uploader
from config.settings import get_settings

settings = get_settings()

cloudinary.config( 
  cloud_name = settings.cloudinary_cloud_name, 
  api_key = settings.cloudinary_api_key, 
  api_secret = settings.cloudinary_api_secret 
)

async def upload_file_to_cloudinary(file, folder="amsns_docs"):
    try:
        # Read file content
        content = await file.read()
        
        # Upload to Cloudinary
        # Note: cloudinary.uploader.upload is synchronous, so it might block the event loop slightly.
        # For high throughput, run in a threadpool, but for this scale it's likely fine or we can use run_in_executor.
        
        result = cloudinary.uploader.upload(
            content, 
            folder=folder,
            resource_type="auto"
        )
        
        # Reset file cursor just in case it's needed elsewhere (though we consumed it)
        await file.seek(0)
        
        return result
    except Exception as e:
        print(f"Cloudinary upload error: {e}")
        return None
