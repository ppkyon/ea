from django.urls import path

from . import ajax, views

app_name = 'user'

urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('detail/', views.DetailView.as_view(), name='detail'),
    
    path('save/', ajax.save, name='save'),
    path('save/check/', ajax.save_check, name='save_check'),
    path('delete/', ajax.delete, name='delete'),
    path('get/', ajax.get, name='get'),
]
