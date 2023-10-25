from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from common import create_code

from ea.models import EaUser, EaData

import uuid

@csrf_exempt
def check(request):
    return JsonResponse( {}, safe=False )

@csrf_exempt
def order(request):
    if EaUser.objects.filter(login=conversion_data(request.POST.get('account'))).exists():
        user = EaUser.objects.filter(login=conversion_data(request.POST.get('account'))).first()
    else:
        user = EaUser.objects.create(
            id = str(uuid.uuid4()),
            display_id = create_code(12, EaUser),
            login = conversion_data(request.POST.get('account')),
        )

    if not EaData.objects.filter(user=user, ticket=request.POST.get('ticket')).exists():
        EaData.objects.create(
            id = str(uuid.uuid4()),
            display_id = create_code(12, EaData),
            user = user,
            type = conversion_data(request.POST.get('type')),
            ticket = conversion_data(request.POST.get('ticket')),
            symbol = conversion_data(request.POST.get('symbol')),
            magic_number = conversion_data(request.POST.get('magicnumber')),
            lots = conversion_data(request.POST.get('lots')),
            swap = conversion_data(request.POST.get('swap')),
            open_price = conversion_data(request.POST.get('openprice')),
            open_time = conversion_data(request.POST.get('opentime')),
            close_price = conversion_data(request.POST.get('closeprice')),
            close_time = conversion_data(request.POST.get('closetime')),
            stop_loss = conversion_data(request.POST.get('stoploss')),
            commission = conversion_data(request.POST.get('commission')),
            expiration = conversion_data(request.POST.get('expiration')),
            profit = conversion_data(request.POST.get('profit')),
            take_profit = conversion_data(request.POST.get('takeprofit')),
            comment = conversion_data(request.POST.get('comment')),
        )

    return JsonResponse( {}, safe=False )

def conversion_data(data):
    if data:
        data = data.replace('\x00', '')
    return data