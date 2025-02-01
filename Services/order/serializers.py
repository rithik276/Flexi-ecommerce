from rest_framework import serializers
from .models import Cart,Favorite,CartProduct,Order
from products.serializers import ProductSerializer,ProductVariantSerializer
from accounts.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email','name']

class CartProductSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product_variant.product.product_name')
    price = serializers.DecimalField(source='product_variant.price', max_digits=10, decimal_places=2)
    color_name = serializers.CharField(source='product_variant.color_name')
    size = serializers.IntegerField()
    quantity = serializers.IntegerField()
    image = serializers.CharField(source='product_variant.image')
    product_variant_id = serializers.UUIDField(source ='product_variant.uid')
    product_variant_url = serializers.CharField(source='product_variant.get_absolute_url')
    product_id = serializers.CharField(source='product_variant.product.uid')
    size_stock = serializers.JSONField(source = 'product_variant.size_stock')

    class Meta:
        model = CartProduct
        fields = [
            'product_variant_id', 'product_name', 'price', 
            'color_name', 'size', 'quantity', 'image', 
            'product_variant_url','size_stock','product_id'
        ]


class CartSerializer(serializers.ModelSerializer):
    cart_id = serializers.UUIDField(source ='uid')
    products = CartProductSerializer(source = 'cartproduct_set',many=True)
    user = UserSerializer()
    class Meta:
        model = Cart
        fields = ["cart_id","user","products","created_at"]


class FavoriteSerializer(serializers.ModelSerializer):
    favorite_id = serializers.UUIDField(source ='uid')
    product = ProductSerializer()
    user = UserSerializer()
    class Meta:
        model = Favorite
        fields = ["favorite_id","created_at","product","user"]



class CartOrderSerializer(serializers.ModelSerializer):
    cart_id = serializers.UUIDField(source ='uid')
    products = ProductSerializer(many=True)
    class Meta:
        model = Cart
        fields = ["cart_id","products","created_at"]


class OrderSerializer(serializers.ModelSerializer):
    order_id = serializers.UUIDField(source ='uid')
    user = UserSerializer()
    cart = CartOrderSerializer()
    class Meta:
        model = Order
        fields = ["order_id","user","cart","paid_amount","shipping_address","phone","created_at"]



class CartDataSerializer(serializers.ModelSerializer):
    size = serializers.IntegerField()
    quantity = serializers.IntegerField()

    class Meta:
        model = CartProduct
        fields = [
             'size', 'quantity']