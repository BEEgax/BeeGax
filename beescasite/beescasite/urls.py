"""beescasite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from api import views as api_views
from frontend import views as frontend_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/hive/', api_views.hive_all),
    path('api/hive/<int:hive_id>', api_views.hive_detail),
    path('api/measurement/', api_views.measurement_all),
    path('api/measurement/<int:hive_id>', api_views.measurement_hive),
    path('api/measurement/<int:hive_id>/<int:starttime>/<int:endtime>', api_views.measurement_hive_timeline),
    path('', frontend_views.index),
    path('functionalCharts', frontend_views.functional_charts),
    path('locations', frontend_views.locations),
]
