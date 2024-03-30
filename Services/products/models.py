from django.db import models
from base.models import BaseModel
from django.utils.text import slugify
from PIL import Image
from django.urls import reverse

def brands_image_upload_path(instance, filename):
        print(instance)
        return f"brands/{instance.slug}/{filename}"

class Brand(BaseModel):
    brand_name = models.CharField(max_length=100)
    slug=models.SlugField(unique=True,blank=True,null=True)
    brand_image = models.ImageField(upload_to=brands_image_upload_path,blank=True,null=True)

    class Meta:
        ordering = ('brand_name',)
        db_table  = 'brands'
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.brand_name)
        super(Brand, self).save(*args, **kwargs)

    def get_absolute_url(self):
        return f'/{self.slug}/'
    
    def __str__(self):
        return self.brand_name


class Product(BaseModel):
    product_name = models.CharField(max_length=100)
    slug = models.SlugField(unique = True,blank=True,null=True)
    brand = models.ForeignKey(Brand,on_delete = models.CASCADE,related_name = 'products')
    product_description = models.TextField(blank=True,null=True)

    class Meta:
        ordering = ('-created_at',)
        db_table  = 'products'
    
    def __str__(self):
        return self.product_name
    
    def get_absolute_url(self):
        return f'/{self.brand.slug}/{self.slug}/'
    
    

    
    def save(self , *args , **kwargs):
        self.slug = slugify(self.product_name)
        super(Product ,self).save(*args , **kwargs)
    

def image_upload_path(instance, filename):
        return f"products/{instance.product.slug}/{filename}"

def default_size_dict():
    return {'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,}

class ProductVariant(BaseModel):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="color_variants")
    color_name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to=image_upload_path,blank=True,null=True)
    size_stock = models.JSONField(default = default_size_dict)
    def get_image(self):
        if self.image:
            return 'http://127.0.0.1:8000' + self.image.url
        return ''
    def get_absolute_url(self):
        return f'/{self.product.slug}/{self.color_name}/{self.uid}'
    
    def __str__(self):
        return self.product.product_name + ' ' + self.color_name 
    
    def save(self):
        super().save()

        img = Image.open(self.image.path)

        if img.height > 300 or img.width > 300:
            new_img = (300, 300)
            img.thumbnail(new_img)
            img.save(self.image.path)
    
    class Meta:
        db_table  = 'product_variant'

    
