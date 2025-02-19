from django.contrib import admin
from .models import Product,Brand,ProductVariant


models = (Product,Brand,ProductVariant)

admin.site.register(models)

