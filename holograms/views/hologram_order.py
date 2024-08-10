from rest_framework import generics
from rest_framework import filters
from ..models.hologram_model import Hologram
from ..serializers.hologram_serializer import HologramSerializer

# Class-based view for sorting and filtering holograms
class HologramListView(generics.ListCreateAPIView):
    serializer_class = HologramSerializer  # Defines which serializer to use for this view

    # Configures the filter backends and fields available for sorting
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['name', 'weight', 'superpower', 'extinct_since']
    ordering = ['name']  # Default ordering field

    def get_queryset(self):
        """
        Retrieves and orders the queryset based on the 'ordering' parameter in the request.
        Defaults to ordering by 'name'.
        """
        queryset = Hologram.objects.all()
        ordering = self.request.GET.get('ordering', 'name') 
        return queryset.order_by(ordering)
