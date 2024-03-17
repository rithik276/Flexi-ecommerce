from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from rest_framework import status
from .models import Cart,Favorite,Order,CartProduct
from products.models import Product
from .serializers import CartSerializer,FavoriteSerializer

class CartView(APIView):
    def get(self,request):
        user=request.user
        if user.is_authenticated:
            carts=Cart.objects.filter(user=user)
            serializer=CartSerializer(carts,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response({"message":"Please Login First"},status=status.HTTP_400_BAD_REQUEST)
        

class AddUpdateCartView(CartView):

    def post(self,request):
        user=request.user

        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)

        if not product_id:
            return Response({"message": "product_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        if quantity is None or quantity < 0:
            return Response({"message": "Invalid quantity"}, status=status.HTTP_400_BAD_REQUEST)
        
        if user.is_authenticated:
            try:
                product = Product.objects.get(uid=product_id)
            except Product.DoesNotExist:
                return Response({"message": "Invalid product"}, status=status.HTTP_400_BAD_REQUEST)
            
        
            # Check if the product is already in the user's cart
            # Separate Cart and created objects from the tuple
            cart, created = Cart.objects.get_or_create(user=user)
            

            if quantity == 0:
                # If quantity is 0, delete the product from the cart if it exists
                cart_product = CartProduct.objects.filter(cart=cart, product=product).first()
                if cart_product:
                    #delete cart product
                    cart_product.delete()
                    return Response("Product deleted from the cart.", status=status.HTTP_204_NO_CONTENT)
                else:
                    return Response("Product not found in the cart.", status=status.HTTP_404_NOT_FOUND)

            #Create Cart PRoduct
            cart_product, created = CartProduct.objects.get_or_create(cart=cart, product=product)
            if not created:
                cart_product.quantity += quantity
                cart_product.save()
                return Response("Quantity updated in the cart.", status=status.HTTP_200_OK)
            
            else:
                # If the product is not in the cart, set the quantity and return the addition response
                cart_product.quantity = quantity
                cart_product.save()
                return Response("Product added to the cart.", status=status.HTTP_201_CREATED)

        else:
            return Response({"msg":"User not Logged In","status":"failed"},status=status.HTTP_401_UNAUTHORIZED)

class FavoriteView(APIView):
    #need to update it in future as User model is created
    def get(self,request):
        user=request.user
        if user.is_authenticated:
            carts=Favorite.objects.filter(user=user)
            serializer=FavoriteSerializer(carts,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response({"message":"Please Login First"},status=status.HTTP_400_BAD_REQUEST)
        
class AddUpdateFavoriteView(CartView):

    def post(self,request):
        user=request.user
        data = request.data
        
        product_id = data.get('product_id')

        if not product_id:
            return Response({"message": "product_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        if user.is_authenticated:
            try:
                product = Product.objects.get(uid=product_id)
            except Product.DoesNotExist:
                return Response({"message": "Invalid product"}, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                # Check if the product is already in the user's favorites list
                favorite_item = Favorite.objects.get(user=user, product=product)
                
                # If the product is already in the cart, update the quantity
                favorite_item.delete()
                
                return Response({"message": "Favorite item updated successfully"}, status=status.HTTP_200_OK)
            
            except Favorite.DoesNotExist:
                # If the product is not in the cart, create a new cart item
                favorite_item = Favorite.objects.create(user=user, product=product)
                
                return Response({"message": "Favorite item added successfully"}, status=status.HTTP_200_OK)


class OrderView(APIView):
    pass












