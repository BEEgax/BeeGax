from rest_framework import serializers
from .models import Measurement, Hive


class HiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hive
        fields = ["id", "location", "hardware_api_key"]


class MeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Measurement
        fields = ["id", "value", "value_type", "date", "hive"]


class POSTMeasurementSerializer:
    def __init__(self, json_dict: dict) -> None:
        data = json_dict["data"]
        measurements = data["measurements"]
        hive = Hive.objects.get(hardware_api_key=data["key"])
        for m in measurements:
            Measurement(value=float(m["value"]), value_type=m["value_type"], date=m["date"], hive=hive).save()