from django.db import models
from base.models import BaseModel
from products.models import Product
from accounts.models import User


class Favorite(BaseModel):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        db_table = 'favorites'
        unique_together = ('product', 'user')
        ordering = ('-created_at',)


class Cart(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product, through='CartProduct')
    class Meta:
        db_table = 'cart'
        unique_together = ('user',)
        ordering = ('-created_at',)

# Intermediate model to store additional information (like quantity) for products in the cart
class CartProduct(BaseModel):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    class Meta:
        db_table = 'cart_product'
        unique_together = ('product',)
        ordering = ('-created_at',)


class Order(BaseModel):
    user = models.ForeignKey(User, related_name='user_orders', on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart, related_name='order_carts', on_delete=models.CASCADE)
    paid_amount = models.IntegerField(blank=True, null=True)
    shipping_address = models.CharField(max_length=255)
    phone = models.CharField(max_length=100)

    class Meta:
        db_table = 'orders'
        ordering = ('-created_at',)

    def __str__(self):
        return f"Order {self.uid}"


    

