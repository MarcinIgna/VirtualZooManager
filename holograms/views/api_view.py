from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from holograms.models.hologram_model import Hologram
from holograms.serializers.hologram_serializer import HologramSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET', 'POST'])
def hologram_list(request):
    
    if request.method == 'GET':
        holograms = Hologram.objects.all()
        serializer = HologramSerializer(holograms, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = HologramSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def hologram_detail(request, pk):
    try:
        hologram = Hologram.objects.get(pk=pk)
    except Hologram.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = HologramSerializer(hologram)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = HologramSerializer(hologram, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        hologram.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)