from django.urls import path, include

from sign import views as sign_views

urlpatterns = [
    path('login/', sign_views.ManagerLoginView.as_view(), name='login'),
    path('logout/', sign_views.ManagerLogoutView.as_view(), name='logout'),
    
    path('ea/', include('ea.urls')),
    path('setting/', include('setting.urls')),
]
