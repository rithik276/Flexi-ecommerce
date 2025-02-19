from django.db import models
import uuid
from django.contrib.auth.models import AbstractBaseUser
from .managers import UserManager
from base.models import BaseModel

class User(AbstractBaseUser):
    id = models.UUIDField(primary_key=True,editable=False,unique=True,default=uuid.uuid4)
    email = models.EmailField(verbose_name = "Email",max_length = 225,unique = True)
    name = models.CharField(max_length = 255,unique=True)
    address = models.TextField(null=True,blank=True)
    phone = models.CharField(max_length=100,null=True)
    is_active = models.BooleanField(default = True)
    is_admin = models.BooleanField(default = False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS=['name','is_admin']

    objects = UserManager()
    
    class Meta:
        db_table = 'accounts'

    def __str__(self):
        return 'Email : '+ self.email + ' UserName: ' + self.name

    def get_user_name(self):
        return self.name

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

    

