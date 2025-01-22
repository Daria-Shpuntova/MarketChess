import uuid
from itertools import product

from django.views import View
from django.views.generic import TemplateView
from .models import Chess, Cart, Wishlist
from .serializers import ChessSerializer, CartSerializer
from rest_framework import generics, viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.sessions.models import Session
from django.db.models.signals import post_delete
from django.dispatch import receiver
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from django.utils.decorators import method_decorator


class HomePageView(TemplateView):
    template_name = 'index.html'


class ChessNewListView(generics.ListCreateAPIView):
    queryset = Chess.objects.order_by('-data')[:2]
    serializer_class = ChessSerializer

class ChessListView(generics.ListAPIView):
    queryset = Chess.objects.all()
    serializer_class = ChessSerializer


@api_view(['POST'])
def add_to_cart(request):
    print(request.COOKIES, 'Cookies добавить в корзину')
    print(request, 'request.data add to cart')
    session_key = request.session.session_key
    print(session_key, 'session_key add to cart')
    if session_key is None:
        request.session.save()
    session_key = request.session.session_key  # Делаем еще один доступ к session_key

    product_id = request.data.get('product_id')
    if not product_id:
        return Response({'error': 'Product ID missing in request'}, status=400)

    try:
        product = Chess.objects.get(id=product_id)
    except Chess.DoesNotExist:
        return Response({'error': 'Product not found'}, status=404)

    cart_item, created = Cart.objects.get_or_create(session_key=session_key, product=product)
    print(cart_item, created,' cart_item, created')
    if not created:
        cart_item.quantity += 1
        cart_item.save()

    return Response({'success': True})


def basket_view(request):
    print("Request data:", request)
    print(request.COOKIES, 'Cookies')
    print("Session :", request.session)
    # Получаем session_key
    session_key = request.session.session_key
    print(session_key, 'session_key')
    print('Корзина')
    # Извлекаем данные корзины из базы данных по session_key
    basket_items = Cart.objects.filter(session_key=session_key)

    # Формируем список для возврата
    basket = [{'id': item.product.id, 'name': item.product.name, 'price': item.product.price, 'quantity': item.quantity,'image': item.product.image.url, 'discount': item.product.discount_percentage, 'available':item.product.quantity} for item in basket_items]

    # Возвращаем данные в формате JSON
    return JsonResponse({'basket': basket})



class CartViewSet(viewsets.ViewSet):
    def partial_update(self, request, pk=None):
        print(request.data)
        try:
            cart_item = Cart.objects.get(pk=pk)
        except Cart.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = CartSerializer(cart_item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





#@method_decorator(csrf_exempt, name='dispatch')
@csrf_exempt
def updateBasketView(request):

    print(request, 'request.data')
    session_key = request.session.session_key
    print(session_key, 'session_key updateBasketView')

    try:
        data = json.loads(request.body)
        print(data, 'data')
        product_id = data['id']
        quantity = data['quantity']
        print(product_id, quantity)

        Cart.objects.update_or_create(
            session_key=session_key,
            product_id=product_id,
            defaults={'quantity': quantity}
        )
        print(Cart.objects.filter(session_key=session_key, product_id=product_id), 'Cart.objects.filter(session_key=session_key)')
        Cart.objects.filter(session_key=session_key, product_id=product_id).update(quantity=quantity)
        print(55, 'Все отлично')
        return JsonResponse({'status': 'success'})
    except:
        print(42, 'не катит')
        return JsonResponse({'status': 'failed'})

@csrf_exempt
def deleteBasketView(request):
    session_key = request.session.session_key
    print(session_key, 'session_key deleteBasketView')

    try:
        data = json.loads(request.body)
        print(data, 'data')
        product_id = data['id']

        print(product_id)
        Cart.objects.filter(session_key=session_key, product_id=product_id).delete()
        print(55, 'Все отлично delette')
        return JsonResponse({'status': 'success'})
    except:
        print(42, 'dddelete не катит')
        return JsonResponse({'status': 'failed'})


@api_view(['POST'])
def add_to_wishlist(request):
    session_key = request.session.session_key

    if session_key is None:
        request.session.save()
    session_key = request.session.session_key  # Делаем еще один доступ к session_key
    product_id = request.data.get('product_id')
    if not product_id:
        return Response({'error': 'Product ID missing in request'}, status=400)

    try:
        product = Chess.objects.get(id=product_id)
    except Chess.DoesNotExist:
        return Response({'error': 'Product not found'}, status=404)

    Wishlist.objects.get_or_create(session_key=session_key, product=product)

    return Response({'success': True})



def wishlist_view(request):
    session_key = request.session.session_key
    print(session_key, 'session_key Wishlist')

    wishlists_item = Wishlist.objects.filter(session_key=session_key)
    print(wishlists_item)

    wishlist = [{'id':item.product.id, 'name': item.product.name, 'price': item.product.price , 'image': item.product.image.url, 'discount': item.product.discount_percentage} for item in wishlists_item]
    return JsonResponse({'wishlist': wishlist})


@csrf_exempt
def deleteWishlist(request):
    session_key = request.session.session_key
    print(session_key, 'session_key delete Wishlist')

    try:
        data = json.loads(request.body)
        print(data, 'data')
        product_id = data['id']

        print(product_id)
        Wishlist.objects.filter(session_key=session_key, product_id=product_id).delete()
        print(55, 'Все отлично delette')
        return JsonResponse({'status': 'success'})
    except:
        print(42, 'dddelete не катит')
        return JsonResponse({'status': 'failed'})


@csrf_exempt
def update_basket_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        session_key = request.session.session_key  # Получить ключ сессии
        print(data, 'data')

        for item_data in data['basket']:
            product_id = item_data['id']  # Здесь мы предполагаем, что это ID продукта
            quantity = item_data['quantity']
            print(product_id, quantity)

            if quantity <= 0:
                # Если количество <= 0, удалить элемент из корзины
                print(quantity, 'quantity<0?')
                Cart.objects.filter(session_key=session_key, product_id=product_id).delete()
            else:
                # Обновить или создать запись в модели корзины
                Cart.objects.update_or_create(
                    session_key=session_key,
                    product_id=product_id,
                    defaults={'quantity': quantity}
                )
                print(product_id, quantity, 'new quantity')

        return JsonResponse({'status': 'success'})

@csrf_exempt
def checkout_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        session_key = request.session.session_key
        items = data.get('items', [])

        for item in items:
            product_id = item['id']
            quantity = item['quantity']
            # Логика уменьшения количества товара в базе данных
            product = Chess.objects.get(id=product_id)
            if product.quantity >= quantity:
                product.quantity -= quantity
                product.save()
            Cart.objects.filter(session_key=session_key, product_id=product_id).delete()

        return JsonResponse({'message': 'Заказ успешно оформлен'})
    return JsonResponse({'error': 'Invalid request'}, status=400)