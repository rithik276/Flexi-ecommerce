from django.urls import path, include

from products import views

urlpatterns = [
    path('brands/', views.BrandDetailView.as_view()),
    path('get_products/', views.GetAllProductsView.as_view()),
    path('select_product/<slug:product_id>/',views.SelectedProductView.as_view()),
    path('products/search/', views.SearchProductView.as_view()),
    path('products/filter/', views.FilterProductsView.as_view(),name="filter_products"),
    path('brands/products/<slug:brand_id>/', views.BrandsProductDetailView.as_view()),
]