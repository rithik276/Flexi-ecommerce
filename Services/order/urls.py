from django.urls import path, include

from products import views
from .views import CartView,AddUpdateCartView,FavoriteView,AddUpdateFavoriteView,OrderView,CreateOrderView,DeleteOrderView,PaymentSuccessView

urlpatterns = [
    path('cart/',CartView.as_view()),
    path('cart/add/',AddUpdateCartView.as_view()),
    path('favorite/',FavoriteView.as_view()),
    path('favorite/add/',AddUpdateFavoriteView.as_view()),
    path('order/',OrderView.as_view()),
    path('order/create/',CreateOrderView.as_view()),
    path('order/delete/',DeleteOrderView.as_view()),
    path('payment_success/',PaymentSuccessView.as_view()),

]