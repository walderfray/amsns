from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache


class Settings(BaseSettings):

    """ Application Settings """

    app_name:  str = "AMSNS"
    debug:  bool = True

    # logging config
    log_file_path: str = "app.log"
    log_file_max_size: int = 5 * 1024 * 1024
    log_file_backup_count: int = 5

    # browser config
    allowed_origins: str = "http://localhost:3000,http://localhost:5173,https://www.americanstatenational.world,https://americanstatenational.world"
    frontend_url: str = "http://localhost:5173"

    # database config
    db_url: str = "mongodb://localhost:27017"

    # security
    jwt_secret: str = "yudwwddW"
    jwt_expiry: int = 60 * 60 * 24
    password_salt: str = "salty"

    # emails
    mail_username: str = "fam360"
    mail_password: str = "mail_pass"
    mail_from: str = "fam360team@fam360.com"
    mail_port: int = 587
    mail_server:  str = "https://mail.com"
    mail_starttls: bool = False
    mail_ssl_tls:  bool = True
    mail_display_name: str = "fam360"
    mail_domain:  str = "https://mail.com"
    mail_domain_username:  str = "admin"

    # support
    support_email: str = "support@myfam360.com"

    # Cloudinary
    cloudinary_cloud_name: str = "cloud_name"
    cloudinary_api_key: str = "api_key"
    cloudinary_api_secret: str = "api_secret"

    model_config = SettingsConfigDict(env_file=".env", extra="allow")


@lru_cache()
def get_settings():
    return Settings()