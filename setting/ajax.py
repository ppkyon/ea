from django.conf import settings
from django.contrib.auth import logout, authenticate
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import send_mail
from django.http import JsonResponse
from django.template.loader import get_template
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode

from common import create_token, create_expiration_date

from sign.models import AuthUser, ManagerProfile, EmailChangeToken

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
    token = create_token()
    if EmailChangeToken.objects.filter(manager=request.user).exists():
        token_data = EmailChangeToken.objects.filter(manager=request.user).first()
        token_data.email = request.POST.get("email"),
        token_data.token = token
        token_data.expiration_date = create_expiration_date(24)
        token_data.save()
    else:
        EmailChangeToken.objects.create(
            id = str(uuid.uuid4()),
            manager = request.user,
            email = request.POST.get("email"),
            token = token,
            expiration_date = create_expiration_date(24)
        )

    subject = 'メールアドレス変更認証メール'
    template = get_template('setting/email/change_email.txt')
    site = get_current_site(request)
    context = {
        'protocol': 'https' if request.is_secure() else 'http',
        'domain': site.domain,
        'uid': force_str(urlsafe_base64_encode(force_bytes(token))),
    }
    send_mail(subject, template.render(context), settings.EMAIL_HOST_USER, [request.POST.get("email")])

    return JsonResponse( {}, safe=False )

def change_email_check(request):
    if AuthUser.objects.filter(email=request.POST.get('email')).exists():
        return JsonResponse( {'check': False, 'message': 'すでに登録済みのメールアドレスです'}, safe=False )
    if not authenticate(username=request.user.email, password=request.POST.get('password')):
        return JsonResponse( {'check': False, 'message': 'パスワードが間違っています'}, safe=False )
    return JsonResponse( {'check': True}, safe=False )

def change_password(request):
    return JsonResponse( {}, safe=False )

def change_password_check(request):
    return JsonResponse( {}, safe=False )