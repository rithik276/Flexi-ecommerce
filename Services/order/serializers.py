from rest_framework import serializers
from .models import Cart,Favorite,CartProduct,Order
from products.serializers import ProductSerializer
from accounts.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email','name']

# class CartProductSerializer(serializers.ModelSerializer):
#     cart_items_id = serializers.UUIDField(source ='uid')
#     product = ProductSerializer()
#     user = UserSerializer()
#     class Meta:
#         model = CartProduct
#         # fields = ["cart_items_id","user","product","quantity","created_at"]
#         fields = "__all__"

class CartSerializer(serializers.ModelSerializer):
    cart_id = serializers.UUIDField(source ='uid')
    products = ProductSerializer(many=True)
    user = UserSerializer()
    class Meta:
        model = Cart
        fields = ["cart_id","user","products","created_at"]


class FavoriteSerializer(serializers.ModelSerializer):
    favorite_id = serializers.UUIDField(source ='uid')
    user = UserSerializer()
    class Meta:
        model = Favorite
        fields = ["favorite_id","created_at","product","user"]



