from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def check(request):
    return JsonResponse( {}, safe=False )

@csrf_exempt
def order(request):
    print(request.POST.get('ticket'))
    return JsonResponse( {}, safe=False )