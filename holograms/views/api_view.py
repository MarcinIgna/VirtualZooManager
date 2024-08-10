from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from holograms.models.hologram_model import Hologram
from holograms.serializers.hologram_serializer import HologramSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# View to handle listing and creating holograms
@api_view(['GET', 'POST'])
def hologram_list(request):
    # Handle GET request: Retrieve and return all holograms
    if request.method == 'GET':
        holograms = Hologram.objects.all()
        serializer = HologramSerializer(holograms, many=True) 
        return Response(serializer.data)

    # Handle POST request: Create a new hologram
    elif request.method == 'POST':
        serializer = HologramSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    
# View to handle retrieving, updating, and deleting a single hologram
@api_view(['GET', 'PUT', 'DELETE'])
def hologram_detail(request, pk):
    
    # Try to get the hologram object by primary key (pk)
    try:
        hologram = Hologram.objects.get(pk=pk) 
    except Hologram.DoesNotExist: 
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Handle GET request: Retrieve and return a single hologram
    if request.method == 'GET':
        serializer = HologramSerializer(hologram)  
        return Response(serializer.data)  

    # Handle PUT request: Update an existing hologram
    elif request.method == 'PUT':
        serializer = HologramSerializer(hologram, data=request.data)  
        
        if serializer.is_valid():  
            serializer.save()  
            return Response(serializer.data) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    
    # Handle DELETE request: Delete the specified hologram
    elif request.method == 'DELETE':
        hologram.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
