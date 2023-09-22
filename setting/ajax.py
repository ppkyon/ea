from django.contrib.auth import logout
from django.http import JsonResponse

from sign.models import AuthUser, ManagerProfile

import uuid

def add_manager(request):
    return JsonResponse( {}, safe=False )

def add_manager_check(request):
    return JsonResponse( {}, safe=False )

def save_manager(request):
    manager = AuthUser.objects.filter(display_id=request.POST.get('id')).first()
    if ManagerProfile.objects.filter(manager=manager).exists():
        manager_profile = ManagerProfile.objects.filter(manager=manager).first()
        manager_profile.family_name = request.POST.get('family_name')
        manager_profile.first_name = request.POST.get('first_name')
        manager_profile.family_name_kana = request.POST.get('family_name_kana')
        manager_profile.first_name_kana = request.POST.get('first_name_kana')
        manager_profile.save()
    else:
        ManagerProfile.objects.create(
            id = str(uuid.uuid4()),
            manager = manager,
            family_name = request.POST.get('family_name'),
            first_name = request.POST.get('first_name'),
            family_name_kana = request.POST.get('family_name_kana'),
            first_name_kana = request.POST.get('first_name_kana'),
        )

    return JsonResponse( {}, safe=False )

def delete_manager(request):
    manager = AuthUser.objects.filter(display_id=request.POST.get('id')).first()
    manager.delete_flg = True
    manager.save()

    logout(request)
    return JsonResponse( {}, safe=False )



def change_email(request):
    return JsonResponse( {}, safe=False )

def change_email_check(request):
    return JsonResponse( {}, safe=False )

def change_password(request):
    return JsonResponse( {}, safe=False )

def change_password_check(request):
    return JsonResponse( {}, safe=False )