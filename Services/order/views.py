from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from rest_framework import status
from rest_framework.exceptions import ValidationError
import json
import os

from .models import Cart,Favorite,Order,CartProduct
from products.models import Product,ProductVariant
from .serializers import CartSerializer,FavoriteSerializer,OrderSerializer

import razorpay

class CartView(APIView):
    def get(self,request):
        user=request.user
        if user.is_authenticated:
            carts=Cart.objects.filter(user=user)
            serializer=CartSerializer(carts,many=True).data
            if serializer:
                serializer = serializer[0]
                for product in serializer['products']:
                    product['price'] = float(product['price'])
                    product['size_stock'] = [{size:stock} for size,stock in product['size_stock'].items() if stock > 0]
            
            return Response(serializer,status=status.HTTP_200_OK)
        else:
            return Response({"message":"Please Login First"},status=status.HTTP_400_BAD_REQUEST)
        

class AddUpdateCartView(CartView):

    def post(self,request):
        user=request.user
        payload = request.data
        for product_item in payload:
            product_id = product_item.get('product_id')
            quantity = product_item.get('quantity', 1)
            product_variant_id = product_item.get('product_variant_id')
            size = product_item.get('size')

            if not product_id:
                return Response({"message": "product_id is required"}, status=status.HTTP_400_BAD_REQUEST)
            
            if not product_variant_id:
                return Response({"message": "product_variant_id is required"}, status=status.HTTP_400_BAD_REQUEST)
            
            if not size:
                return Response({"message": "size is required"}, status=status.HTTP_400_BAD_REQUEST)
            
            if quantity is None or quantity < 0:
                return Response({"message": "Invalid quantity"}, status=status.HTTP_400_BAD_REQUEST)
            
            if user.is_authenticated:
                try:
                    product = Product.objects.get(uid=product_id)
                except Product.DoesNotExist:
                    return Response({"message": "Invalid product"}, status=status.HTTP_400_BAD_REQUEST)
                
                try:
                    product_variant = ProductVariant.objects.get(uid=product_variant_id)
                except ProductVariant.DoesNotExist:
                    return Response({"message": "Invalid product variant"}, status=status.HTTP_400_BAD_REQUEST)
                
            
                # Check if the product is already in the user's cart
                # Separate Cart and created objects from the tuple
                cart, created = Cart.objects.get_or_create(user=user)
                

                if quantity == 0:
                    # If quantity is 0, delete the product from the cart if it exists
                    cart_product = CartProduct.objects.filter(cart=cart, product=product, product_variant = product_variant, size = size)
                    if cart_product:
                        #delete cart product
                        cart_product.delete()
                        return Response("Product deleted from the cart.", status=status.HTTP_204_NO_CONTENT)
                    else:
                        return Response("Product not found in the cart.", status=status.HTTP_404_NOT_FOUND)

                #Create Cart PRoduct
                cart_product, created = CartProduct.objects.update_or_create(cart=cart, product=product,
                                                                          product_variant = product_variant,
                                                                          size = size,defaults={"quantity": quantity})
                # if not created:
                #     cart_product.quantity = quantity
                #     cart_product.save()
                #     return Response("Quantity updated in the cart.", status=status.HTTP_200_OK)
                
            else:
                return Response({"msg":"User not Logged In","status":"failed"},status=status.HTTP_401_UNAUTHORIZED)

        return Response("Product added to the cart.", status=status.HTTP_201_CREATED)
        

class FavoriteView(APIView):
    #need to update it in future as User model is created
    def get(self,request):
        user=request.user
        if user.is_authenticated:
            carts=Favorite.objects.filter(user=user)
            serializer=FavoriteSerializer(carts,many=True).data
            for favorite in serializer:
                favorite['size_stock'] = [int(size) for size,stock in favorite['size_stock'].items() if stock > 0]
                
            return Response(serializer,status=status.HTTP_200_OK)
        else:
            return Response({"message":"Please Login First"},status=status.HTTP_400_BAD_REQUEST)


class AddUpdateFavoriteView(CartView):

    def post(self,request):
        user=request.user
        data = request.data
        
        product_id = data.get('product_id')
        product_variant_id = data.get('product_variant_id')

        if not product_id:
            return Response({"message": "product_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        if not product_variant_id:
            return Response({"message": "product_variant_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        if user.is_authenticated:
            try:
                product = Product.objects.get(uid=product_id)
            except Product.DoesNotExist:
                return Response({"message": "Invalid product"}, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                product_variant = ProductVariant.objects.get(uid=product_variant_id,product = product_id)
            except ProductVariant.DoesNotExist:
                return Response({"message": "Invalid product"}, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                # Check if the product is already in the user's favorites list
                favorite_item = Favorite.objects.get(user=user, product=product, product_variant = product_variant)
                
                # If the product is already in the cart, update the quantity
                favorite_item.delete()
                
                return Response({"message": "Favorite item updated successfully"}, status=status.HTTP_200_OK)
            
            except Favorite.DoesNotExist:
                # If the product is not in the cart, create a new cart item
                favorite_item = Favorite.objects.create(user=user, product=product, product_variant = product_variant)
                
                return Response({"message": "Favorite item added successfully"}, status=status.HTTP_200_OK)


class OrderView(APIView):
    
    def get(self,request):
        user = request.user
        order = Order.objects.filter(user=user)
        serializer = OrderSerializer(order,many=True).data
        
        if not serializer:
            return Response({"orders": {},"msg":'Orders not found'},status=status.HTTP_404_NOT_FOUND)
        
        return Response({"orders":serializer,"msg":'order fetched successfully'},status=status.HTTP_200_OK)


class CreateOrderView(APIView):
    '''
    #PAYLOAD
    {
        "cart_id":"d0cbbe5b-f17d-4215-b873-e2f2274e762b",
        "paid_amount":12,
        "shipping_address":"as",
        "phone":"1254"
    }
    '''
    def post(self, request):
        user = request.user
        data = request.data

        # Validate required fields
        required_fields = ['cart_id', 'paid_amount', 'shipping_address', 'phone']
        for field in required_fields:
            if field not in data:
                return Response({"error": f"Field '{field}' is required"}, status=status.HTTP_400_BAD_REQUEST)

        if user.is_authenticated:
            try:
                cart = Cart.objects.get(uid=data['cart_id'])
            except Cart.DoesNotExist:
                return Response({"error": "Cart not found"}, status=status.HTTP_400_BAD_REQUEST)
            
            client = razorpay.Client(auth = (os.environ['RP_PUBLIC_KEY'], os.environ['RP_SECRET_KEY']))

            payment = client.order.create({
                "amount" : int(data['paid_amount']) * 100,
                "currency" : "INR",
                "payment_capture" : "1"})
        
            # Extract necessary fields and create Order object
            order_data = {
                'user': user,
                'cart':cart,
                'paid_amount': data['paid_amount'],
                'shipping_address': data['shipping_address'],
                'phone': data['phone'],
                'is_paid' : False,
                'payment_id':payment['id']
            }

            try:
                order_item = Order.objects.create(**order_data)
                order_serializer = OrderSerializer(order_item)
                res = {
                        "payment": payment,
                        "order": order_serializer.data
                    }
                return Response({"message": "Order created successfully","data": res}, status=status.HTTP_201_CREATED)
            except ValidationError as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "User not logged in"}, status=status.HTTP_401_UNAUTHORIZED)


class DeleteOrderView(APIView):
    def delete(self, request):
        user = request.user
        order_id = request.query_params["order_id"]

        if user.is_authenticated:
            try:
                order = Order.objects.get(uid=order_id, user=user)
                order.delete()
                return Response({"message": "Order deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
            except Order.DoesNotExist:
                return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "User not logged in"}, status=status.HTTP_401_UNAUTHORIZED)


class PaymentSuccessView(APIView):

    def post(self,request):
        user_id = request.user.id
        res = json.loads(request.data["response"])
        ord_id = ""
        raz_pay_id = ""
        raz_signature = ""

        for key in res.keys():
            if key == 'razorpay_order_id':
                ord_id = res[key]
            elif key == 'razorpay_payment_id':
                raz_pay_id = res[key]
            elif key == 'razorpay_signature':
                raz_signature = res[key]

        order = Order.objects.get(payment_id=ord_id)

        # we will pass this whole data in razorpay client to verify the payment
        data = {
            'razorpay_order_id': ord_id,
            'razorpay_payment_id': raz_pay_id,
            'razorpay_signature': raz_signature
        }



        client = razorpay.Client(auth=(os.environ.get('RP_PUBLIC_KEY'), os.environ.get('RP_SECRET_KEY')))
        
        try:
            util = razorpay.Utility(client)
            check = util.verify_payment_signature(data)
        except Exception as e:
            return Response({'error': "error in Verification. please try again"},status=status.HTTP_417_EXPECTATION_FAILED)

        order.isPaid = True
        order.save()
        cart_delete = Cart.objects.filter(user = user_id).delete()

        res_data = {
            'message': 'payment successfully received!'
        }

        return Response(res_data, status=status.HTTP_200_OK)









