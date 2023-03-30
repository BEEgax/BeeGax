from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, './index.html')

def functional_charts(request):
    return render(request, './functionalCharts.html')

def locations(request):
    return render(request, './locations.html')
