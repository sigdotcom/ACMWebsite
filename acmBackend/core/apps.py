from django.apps import AppConfig

class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core'

    def ready(self):
        # We import these locally to avoid the AppRegistryNotReady error
        from django.contrib.auth.models import update_last_login
        from django.contrib.auth.signals import user_logged_in
        
        # This prevents the MongoDB Primary Key crash during login
        user_logged_in.disconnect(update_last_login)