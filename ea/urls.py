from django.urls import path

from . import post

app_name = 'ea'

urlpatterns = [
    path('check/', post.check, name='check'),
    path('order/', post.order, name='order'),
]
