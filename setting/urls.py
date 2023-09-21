from django.urls import path

from . import ajax, views

app_name = 'setting'

urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),

    path('manager/save', ajax.save_manager, name='save_manager'),
    path('manager/delete', ajax.delete_manager, name='delete_manager'),
]
