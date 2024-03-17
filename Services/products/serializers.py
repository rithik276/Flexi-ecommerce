from rest_framework import serializers

from .models import Brand, Product,ProductVariant

# Wrong way

class BrandSerializer(serializers.ModelSerializer):
    brand_id = serializers.UUIDField(source = 'uid')
    class Meta:
        model = Brand
        # fields = "__all__"
        fields = ['brand_id','brand_name','brand_image','slug','get_absolute_url']

class ProductSerializer(serializers.ModelSerializer):
    brand = BrandSerializer()
    product_id = serializers.UUIDField(source = 'uid')
    class Meta:
        model = Product
        # fields = "__all__"
        fields  = ['product_id','product_name','product_description','get_absolute_url','brand']

class ProductVariantSerializer(serializers.ModelSerializer):
    product_variant_id = serializers.UUIDField(source = 'uid')
    product = ProductSerializer()
    class Meta:
        model = ProductVariant
        fields = ['product','product_variant_id','color_name','price','image','size_stock','get_absolute_url']


        