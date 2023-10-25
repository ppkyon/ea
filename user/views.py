from django.shortcuts import render, redirect

from django.views.generic import View
from sign.mixin import ManagerLoginMixin

from ea.models import EaUser, EaData, EaUserProfile

import datetime

class IndexView(ManagerLoginMixin, View):
    template_name = 'user/index.html'
    title = 'ユーザーリスト'

    def get(self, request, **kwargs):
        user = EaUser.objects.filter(delete_flg=False).order_by('-created_at').all()
        for user_index, user_item in enumerate(user):
            user[user_index].profile = EaUserProfile.objects.filter(user=user_item).first()
            user[user_index].last = EaData.objects.filter(user=user_item).order_by('-close_time').first()
            user[user_index].last_date = datetime.datetime.fromtimestamp(int(user[user_index].last.close_time), datetime.timezone(datetime.timedelta(hours=0), 'JST'))

        data = {
            'title': self.title,
            'user': user,
        }
        return render(self.request, self.template_name, data)

class DetailView(ManagerLoginMixin, View):
    template_name = 'user/detail.html'
    title = 'ユーザー詳細'

    def get(self, request, **kwargs):
        user = EaUser.objects.filter(display_id=request.GET.get('id'), delete_flg=False).first()
        if user:
            user.profile = EaUserProfile.objects.filter(user=user).first()

            data = {
                'title': self.title,
                'user': user,
            }
            return render(self.request, self.template_name, data)
        else:
            return redirect('user:index')
