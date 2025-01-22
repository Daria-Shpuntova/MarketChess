from rest_framework import serializers
from .models import Chess, Cart

class ChessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chess
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'