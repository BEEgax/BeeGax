from django.contrib import admin
from .models import Measurement, Hive

# Register your models here.
admin.site.register(Measurement)
admin.site.register(Hive)
