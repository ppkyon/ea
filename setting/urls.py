from django.urls import path

from . import ajax, views

app_name = 'setting'

urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),

    path('manager/add/', ajax.add_manager, name='add_manager'),
    path('manager/add/check/', ajax.add_manager_check, name='add_manager_check'),
    path('manager/save', ajax.save_manager, name='save_manager'),
    path('manager/delete', ajax.delete_manager, name='delete_manager'),
    path('manager/get', ajax.get_manager, name='get_manager'),

    path('email/change/', ajax.change_email, name='change_email'),
    path('email/change/check/', ajax.change_email_check, name='change_email_check'),
    path('password/change/', ajax.change_password, name='change_password'),
    path('password/change/check/', ajax.change_password_check, name='change_password_check'),
    path('password/reset/', ajax.reset_password, name='reset_password'),
]
