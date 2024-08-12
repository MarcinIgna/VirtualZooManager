from rest_framework import generics
from rest_framework import filters
from ..models.hologram_model import Hologram
from ..serializers.hologram_serializer import HologramSerializer

# Class-based view for sorting
class HologramListView(generics.ListCreateAPIView):
    serializer_class = HologramSerializer  # Defines which serializer to use for this view

    # Configures the filter backends and fields available for sorting
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['name', 'weight', 'superpower', 'extinct_since']
    ordering = ['name'] 

    def get_queryset(self):
        """
        Retrieves and orders the queryset based on the 'ordering' parameter in the request.
        Defaults to ordering by 'name'.
        """
        queryset = Hologram.objects.all()  # Fetch all hologram records
        ordering = self.request.GET.get('ordering', 'name')  # Get the 'ordering' parameter from the request, default to 'name'
        return queryset.order_by(ordering)  # Return the queryset ordered by the specified field
