from django.conf import settings
from django.contrib import messages
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import send_mail
from django.shortcuts import render, redirect, resolve_url, get_object_or_404
from django.template.loader import get_template
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode

from django.contrib.auth.views import LoginView, LogoutView
from django.views.generic import View

from sign.forms import ManagerLoginForm

from sign.models import EmailChangeToken

import datetime

class ManagerLoginView(LoginView):
    title = 'ログイン'
    form_class = ManagerLoginForm
    template_name = 'sign/manager/login.html'

    def get(self, request, **kwargs):
        if request.user.is_authenticated:
            return redirect('/setting/') #dashboard
        else:
            return render(self.request, self.template_name, {'title': self.title})
    
    def get_success_url(self):
        if self.request.user.status <= 1:
            return self.get_redirect_url() or resolve_url('setting:index')
        else:
            return self.get_redirect_url() or resolve_url('setting:index') #dashboard
    
    def form_invalid(self, form):
        for error_message in form.errors.as_data():
            messages.add_message( self.request, messages.ERROR, form.errors.as_data()[error_message][0].message )
        return render(self.request, self.template_name, {'title': self.title, 'form': form})

class ManagerLogoutView(LogoutView):
    next_page = '/login'

class EmailChangeView(View):
    template_name = 'sign/manager/change_email.html'
    title = 'メールアドレス変更'

    def get(self, request, **kwargs):
        user = None
        try:
            token = force_str(urlsafe_base64_decode(kwargs.get("uidb64")))
            temp_user = get_object_or_404(EmailChangeToken, token=token)
            user = temp_user.manager
        except:
            user = None
            
        EmailChangeToken.objects.filter(token=token).delete()
        if user == None:
            return render(self.request, self.template_name, {'title': self.title, 'user': user, 'status': 1})
        elif datetime.datetime.now() > temp_user.expiration_date:
            return render(self.request, self.template_name, {'title': self.title, 'user': user, 'status': 2})
        else:
            user.email = temp_user.email
            user.save()
            
            subject = 'メールアドレス変更完了メール'
            template = get_template('setting/email/change_email_complete.txt')
            site = get_current_site(request)
            context = {
                'protocol': 'https' if request.is_secure() else 'http',
                'domain': site.domain,
                'user': user,
            }
            send_mail(subject, template.render(context), settings.EMAIL_HOST_USER, [user.email])

            return render(self.request, self.template_name, {'title': self.title, 'user': user, 'status': 0})