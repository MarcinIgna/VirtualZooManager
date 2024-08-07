from rest_framework import generics
from rest_framework import filters
from ..models.hologram_model import Hologram  # Import na początku pliku
from ..serializers.hologram_serializer import HologramSerializer

class HologramListView(generics.ListCreateAPIView):
    serializer_class = HologramSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['name', 'weight', 'superpower', 'extinct_since']
    ordering = ['name'] 

    def get_queryset(self):
        queryset = Hologram.objects.all()
        ordering = self.request.GET.get('ordering', 'name') 
        return queryset.order_by(ordering)
