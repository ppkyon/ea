from django.db.models import Count, Sum
from django.db.models.functions import TruncMonth
from django.shortcuts import render, redirect

from dateutil.relativedelta import relativedelta

from django.views.generic import View
from sign.mixin import ManagerLoginMixin

from ea.models import EaUser, EaData, EaUserProfile

import datetime

class IndexView(ManagerLoginMixin, View):
    template_name = 'user/index.html'
    title = 'ユーザーリスト'

    def get(self, request, **kwargs):
        today = datetime.date.today()
        prev = today + relativedelta(months=-1)

        user = EaUser.objects.filter(delete_flg=False).order_by('-created_at').all()
        for user_index, user_item in enumerate(user):
            user[user_index].profile = EaUserProfile.objects.filter(user=user_item).first()
            user[user_index].last = EaData.objects.filter(user=user_item).order_by('-close_time').first()
            
            user[user_index].current = EaData.objects.annotate(close_month=TruncMonth('close_time')).values('close_month').annotate(count=Count("id"), profit_month=Sum('profit')).values('count', 'close_month', 'profit_month').filter(close_month__year=today.year, close_month__month=today.month).order_by('close_month').first()
            user[user_index].prev = EaData.objects.annotate(close_month=TruncMonth('close_time')).values('close_month').annotate(count=Count("id"), profit_month=Sum('profit')).values('count', 'close_month', 'profit_month').filter(close_month__year=prev.year, close_month__month=prev.month).order_by('close_month').first()


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
            user.history = EaData.objects.annotate(close_month=TruncMonth('close_time')).values('close_month').annotate(count=Count("id"), profit_month=Sum('profit')).values('count', 'close_month', 'profit_month').order_by("-close_month").all()

            data = {
                'title': self.title,
                'user': user,
            }
            return render(self.request, self.template_name, data)
        else:
            return redirect('user:index')

class HistoryView(ManagerLoginMixin, View):
    template_name = 'user/history.html'
    title = 'ユーザー取引履歴'

    def get(self, request, **kwargs):
        history = EaData.objects.filter(close_time__year=request.GET.get('year'), close_time__month=request.GET.get('month')).all()
        data = {
            'title': self.title,
            'year': request.GET.get('year'),
            'month': request.GET.get('month'),
            'history': history,
        }
        return render(self.request, self.template_name, data)