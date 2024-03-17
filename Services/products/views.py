from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ProductVariant,Product,Brand
from .serializers import ProductVariantSerializer,BrandSerializer,ProductSerializer
from django.db.models import Q
from rest_framework import status

class GetAllProductsView(APIView):
    def get(self, request):
        
        # Retrieve all variants for the specified product UID
        product_variants = ProductVariant.objects.all()

        # Serialize the data
        product_variants_data = ProductVariantSerializer(product_variants, many=True).data

        response_data = {}
        for product_variant in product_variants_data:
            product_id = product_variant['product']['product_id']

            if product_id not in response_data:
                response_data[product_id] = {
                    'product': product_variant['product'],
                    'variants': []
                }
            
            response_data[product_id]['variants'].append(product_variant)

        
        return Response(response_data)
        

class SearchProductView(APIView):

    def post(self, request):
        query = request.data.get('query')

        if query:
            products = Product.objects.filter(Q(product_name__icontains=query) | Q(product_description__icontains=query) | Q(brand__brand_name__icontains=query))
            products_data = ProductSerializer(products, many=True).data
            if not products_data:
                return Response({"products": [],"msg":'Data not found'},status=status.HTTP_404_NOT_FOUND)
            return Response(products_data,status=status.HTTP_200_OK)
        else:
            return Response({"products": [],"msg":'Error Occured'},status=status.HTTP_417_EXPECTATION_FAILED)
        

class GetProductsView(APIView):
    def get(self, request, product_id):
        
        # Retrieve all variants for the specified product UID
        product_variants = ProductVariant.objects.filter(product_id=product_id)
        
        # Serialize the data
        product_variants_data = ProductVariantSerializer(product_variants, many=True).data
        if not product_variants_data:
            return Response({"products": {},"msg":'Data not found'},status=status.HTTP_404_NOT_FOUND)
        
        response_data = {}
        for product_variant in product_variants_data:
            if product_variant['product']['product_id'] not in response_data:
                response_data[product_variant['product']['product_id']] = {
                    'product': product_variant['product'],
                    'variants': []
                }
            response_data[product_variant['product']['product_id']]['variants'].append(product_variant)

        if not response_data:
            return Response({"products": {},"msg":'Error while parsing data'},status=status.HTTP_417_EXPECTATION_FAILED)

        return Response(response_data)
    


class FilterProductsView(APIView):
    def get(self, request):
        data = request.data

        #payload
        # { "brand_name": ["Nike","Puma"],
        #    "size": ["10","11"],
        #    "color": ["Black"]
        # }

        if not data:
            return Response({"products": {},"msg":'Error while parsing data'},status=status.HTTP_417_EXPECTATION_FAILED)
        
        brand_name_filters = data.get("brand_name", [])
        color_filters = data.get("color", [])
        size_filters = data.get("size", [])

        filters = Q()

        if brand_name_filters:
            filters &= Q(product__brand__brand_name__in=brand_name_filters)

        if color_filters:
            filters &= Q(color_name__in=color_filters)


        if size_filters:
            for i in size_filters:
                filters |= Q(size_stock__has_key=i)
            

        products = ProductVariant.objects.filter(filters)
        serializer = ProductVariantSerializer(products, many=True)

        return Response({"products": serializer.data},status=status.HTTP_200_OK)


class BrandDetailView(APIView):
    def get(self, request):
        brand_data = Brand.objects.all()
        serializer = BrandSerializer(brand_data, many=True)
        return Response({"brands": serializer.data},status=status.HTTP_200_OK)
    

class BrandsProductDetailView(APIView):
    def get(self, request, brand_id):
        product_data = Product.objects.filter(brand__uid = brand_id)
        serializer = ProductSerializer(product_data, many=True)
        return Response({"brands": serializer.data},status=status.HTTP_200_OK)
        