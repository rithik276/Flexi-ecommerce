from django.contrib import admin

from .models import Cart,Favorite,Order,CartProduct

admin.site.register((Cart,CartProduct,Favorite,Order))
# Register your models here.
