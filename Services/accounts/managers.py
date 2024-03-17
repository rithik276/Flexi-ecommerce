from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, name, is_admin=False, password=None):
        """
        Creates and saves a User with the given email, name and password.
        """
        if not email:
            raise ValueError('User must have an email address')
        
        user = self.model(
            email=self.normalize_email(email),
            name=name,
            is_admin=is_admin
        )
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, email, name, is_admin=True, password=None):
        """
        Creates and saves a Superuser with the given email, name and password.
        """
        if not email:
            raise ValueError('Super User must have an email address')
        
        user = self.create_user(
            email=email,
            password=password,
            name=name,
            is_admin=is_admin
        )
        user.is_admin = True
        user.save()
        return user