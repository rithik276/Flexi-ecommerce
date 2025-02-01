from rest_framework import serializers

from .models import Brand, Product,ProductVariant
from order.models import CartProduct

# Wrong way

class BrandSerializer(serializers.ModelSerializer):
    brand_id = serializers.UUIDField(source = 'uid')
    class Meta:
        model = Brand
        # fields = "__all__"
        fields = ['brand_id','brand_name','brand_image','slug','get_absolute_url']


class ProductSearchSerializer(serializers.ModelSerializer):
    product_id = serializers.UUIDField(source = 'uid')
    class Meta:
        model = Product
        # fields = "__all__"
        fields  = ['product_id','product_name','get_absolute_url']

class ProductListSerializer(serializers.ModelSerializer):
    product_variant_id = serializers.UUIDField(source = 'uid')
    product_id = serializers.UUIDField(source = 'product.uid')
    product_name = serializers.UUIDField(source = 'product.product_name')
    class Meta:
        model = ProductVariant
        fields = ['product_id','product_name','product_variant_id','price','image']


class CartDataSerializer(serializers.ModelSerializer):
    size = serializers.IntegerField()
    class Meta:
        model = CartProduct
        fields = [
             'size']
        
class ProductVariantSerializer(serializers.ModelSerializer):
    product_variant_id = serializers.UUIDField(source = 'uid')
    cart = CartDataSerializer(source = 'cartproduct_set',many=True)
    size_stock = serializers.SerializerMethodField()
    class Meta:
        model = ProductVariant
        fields = ['product_variant_id','color_name','price','image','size_stock','get_absolute_url','cart']
    
    def get_size_stock(self, obj):
        return {int(size) for size, stock in obj.size_stock.items() if stock > 0}
    

class ProductSerializer(serializers.ModelSerializer):
    # brand = BrandSerializer()
    product_id = serializers.UUIDField(source = 'uid')
    variants = ProductVariantSerializer(source = 'productvariant_set',many=True)
    class Meta:
        model = Product
        fields  = ['product_id','product_name','product_description','get_absolute_url','variants']