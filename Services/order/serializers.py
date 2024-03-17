from rest_framework import serializers
from .models import Cart,Favorite,CartProduct,Order
from products.serializers import ProductSerializer
from accounts.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email','name']

class CartSerializer(serializers.ModelSerializer):
    cart_id = serializers.UUIDField(source ='uid')
    products = ProductSerializer(many=True)
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



