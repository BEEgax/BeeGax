from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, './index.html')

def charts(request):
    return render(request, './charts.html')

def locations(request):
    return render(request, './locations.html')
