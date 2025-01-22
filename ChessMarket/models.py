from django.db import models
import datetime
from django.utils import timezone
from django.contrib.sessions.models import Session
from django.dispatch import receiver
from django.db.models.signals import post_delete

class Chess(models.Model):
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images/')
    price = models.IntegerField()
    quantity = models.IntegerField()
    color = models.CharField(max_length=100)
    discount_percentage = models.IntegerField(null=True, blank=True) # Поле для скидки
    discount_start_date = models.DateTimeField(null=True, blank=True)  # Дата начала скидки
    discount_end_date = models.DateTimeField(null=True, blank=True)  # Дата окончания скидки
    data = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def get_discounted_price(self): #потом проверять есть ли get_discounted_price, если есть то отображать ее , зачеркивая price тегом s
        if self.discount_percentage and self.discount_start_date <= timezone.now() <= self.discount_end_date:
            return self.price * (1 - (self.discount_percentage / 100))
        return self.price

    class Meta:
        verbose_name='Шахматы'
        verbose_name_plural='Шахматы'

    def __str__(self):
        return self.name


class Cart(models.Model):
    session_key = models.CharField(max_length=40)
    product = models.ForeignKey(Chess, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

class Wishlist(models.Model):
    session_key = models.CharField(max_length=40)
    product = models.ForeignKey(Chess, on_delete=models.CASCADE)