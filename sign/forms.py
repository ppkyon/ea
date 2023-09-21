from django import forms
from django.contrib.auth.forms import authenticate

from django.contrib.auth.forms import AuthenticationForm

class ManagerLoginForm(AuthenticationForm):
    def clean(self):
        email = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')

        if email is not None and password:
            self.user_cache = authenticate(self.request, email=email, password=password)

            if self.user_cache is None or self.user_cache.status == 0:
                raise forms.ValidationError("ログイン情報が間違っています")
            elif self.user_cache.delete_flg:
                raise forms.ValidationError("アカウントが停止されています")
            else:
                self.confirm_login_allowed(self.user_cache)
        return self.cleaned_data