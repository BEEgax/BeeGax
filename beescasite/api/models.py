from django.db import models

class Hive(models.Model):
    name = models.CharField(max_length=64)
    # example: "47.2244676,15.6047803"
    location = models.CharField(max_length=23)
    hardware_api_key = models.CharField(max_length=10)


class Measurement(models.Model):
    class MeasurementType(models.IntegerChoices):
        WEIGHT = 0
        TEMPERATURE = 1
        HUMIDITY = 2
    value = models.FloatField()
    value_type = models.IntegerField(choices=MeasurementType.choices)
    # unix timeformat
    date = models.PositiveBigIntegerField()
    hive = models.ForeignKey(Hive, on_delete=models.CASCADE)
