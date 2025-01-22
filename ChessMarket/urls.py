from django.urls import path, include
from .views import HomePageView, ChessListView, ChessNewListView, add_to_cart, add_to_wishlist, basket_view, \
    wishlist_view, update_basket_view, CartViewSet, updateBasketView, deleteBasketView, checkout_view, deleteWishlist
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'cart', CartViewSet, basename='cart')

urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('api/chessNew', ChessNewListView.as_view(), name='chessNew'),
    path('api/chessAll', ChessListView.as_view(), name='chess_list'),
    path('api/add-to-cart/', add_to_cart, name='add-to-cart'),
    path('api/add-to-wishlist/', add_to_wishlist, name='add-to-wishlist'),
    path('api/basket', basket_view, name='basket'),
    path('api/wishlist', wishlist_view, name='wishlist'),
    path('api/update_basket', updateBasketView, name='update_basket'),
    path('api/delete', deleteBasketView , name='delete_basket_item'),
    path('api/checkout', checkout_view, name='checkout' ),
    path('api/deleteWishlist', deleteWishlist , name='delete_basket_item'),
    path('', include(router.urls))
]