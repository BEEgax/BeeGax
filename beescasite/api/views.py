from django.http import HttpResponse, JsonResponse
from .models import Measurement, Hive
from .serializers import MeasurementSerializer, POSTMeasurementSerializer, HiveSerializer
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response


# Create your views here.

@api_view(["GET", "POST"])
def hive_all(request):
	if request.method == "GET":
		hives = Hive.objects.all()
		serializer = HiveSerializer(hives, many=True)
		return JsonResponse({"data":serializer.data})
	if request.method == "POST":
		serializer = HiveSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET", "POST"])
def measurement_all(request):
	if request.method == "GET":
		measurements = Measurement.objects.all()
		serializer = MeasurementSerializer(measurements, many=True)
		return JsonResponse({"data":serializer.data})
	if request.method == "POST":
		try:
			POSTMeasurementSerializer(request.data)
		except Hive.DoesNotExist:
			return Response(status=status.HTTP_404_NOT_FOUND)
		except Exception:
			return Response(status=status.HTTP_400_BAD_REQUEST)
		return Response(status=status.HTTP_201_CREATED)


@api_view(["GET"])
def measurement_hive(request, hive_id):
	measurements = Measurement.objects.filter(hive=hive_id)
	serializer = MeasurementSerializer(measurements, many=True)
	return JsonResponse({"data":serializer.data})


@api_view(["GET"])
def measurement_hive_timeline(request, hive_id, starttime, endtime):
	measurements = Measurement.objects \
		.filter(hive_id=hive_id, date__range=(starttime, endtime)) \
		.order_by("date")
	spaced_entries = measurements[::len(measurements)//10+1]
	serializer = MeasurementSerializer(spaced_entries, many=True)
	return JsonResponse({"data":serializer.data})
