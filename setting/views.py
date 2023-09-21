from django.shortcuts import render

from django.views.generic import View
from sign.mixin import ManagerLoginMixin

from sign.models import AuthUser, ManagerProfile

class IndexView(ManagerLoginMixin, View):
    template_name = 'setting/index.html'
    title = '設定'

    def get(self, request, **kwargs):
        manager = self.request.user
        manager.profile = ManagerProfile.objects.filter(manager=self.request.user).first()
        
        manager_list = AuthUser.objects.filter(delete_flg=False).order_by('created_at').all()
        for manager_index, manager_item in enumerate(manager_list):
            manager_list[manager_index].profile = ManagerProfile.objects.filter(manager=manager_item).first()

        data = {
            'title': self.title,
            'manager': manager,
            'manager_list': manager_list,
        }
        return render(self.request, self.template_name, data)
