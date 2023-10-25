from django.http import JsonResponse

from common import get_model_field

from ea.models import EaUser, EaUserProfile

import uuid

def save_check(request):
    if EaUserProfile.objects.filter(email=request.POST.get('email')).exists():
        return JsonResponse( {'check': False, 'message': 'すでに登録済みのメールアドレスです'}, safe=False )
    else:
        return JsonResponse( {'check': True, 'message': ''}, safe=False )

def save(request):
    user = EaUser.objects.filter(display_id=request.POST.get('id')).first()
    if EaUserProfile.objects.filter(user=user).exists():
        user_profile = EaUserProfile.objects.filter(user=user).first()
        user_profile.email = request.POST.get('email')
        user_profile.family_name = request.POST.get('family_name')
        user_profile.first_name = request.POST.get('first_name')
        user_profile.family_name_kana = request.POST.get('family_name_kana')
        user_profile.first_name_kana = request.POST.get('first_name_kana')
        user_profile.save()
    else:
        EaUserProfile.objects.create(
            id = str(uuid.uuid4()),
            user = user,
            email = request.POST.get('email'),
            family_name = request.POST.get('family_name'),
            first_name = request.POST.get('first_name'),
            family_name_kana = request.POST.get('family_name_kana'),
            first_name_kana = request.POST.get('first_name_kana'),
        )

    return JsonResponse( {}, safe=False )

def delete(request):
    user = EaUser.objects.filter(display_id=request.POST.get('id')).first()
    user.delete_flg = True
    user.save()
    
    return JsonResponse( {}, safe=False )

def get(request):
    user = EaUser.objects.filter(display_id=request.POST.get('id')).values(*get_model_field(EaUser)).first()
    user['profile'] = EaUserProfile.objects.filter(user__id=user['id']).values(*get_model_field(EaUserProfile)).first()
    user['created_at'] = user['created_at'].strftime('%Y年%m月%d日')
    return JsonResponse( user, safe=False )