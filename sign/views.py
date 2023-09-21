from django.contrib import messages
from django.shortcuts import render, redirect, resolve_url

from django.contrib.auth.views import LoginView, LogoutView

from sign.forms import ManagerLoginForm

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
