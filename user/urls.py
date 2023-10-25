from django.urls import path

from . import ajax, views

app_name = 'user'

urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    
    path('save', ajax.save, name='save'),
    path('save/check/', ajax.save_check, name='save_check'),
    path('get', ajax.get, name='get'),
]
