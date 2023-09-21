from django.shortcuts import redirect
from django.contrib.auth.mixins import LoginRequiredMixin

class ManagerLoginMixin(LoginRequiredMixin):
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or request.user.status == 0 or request.user.delete_flg:
            return redirect('/logout')
        return super().dispatch(request, *args, **kwargs)