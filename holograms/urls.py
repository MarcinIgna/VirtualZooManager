from django.urls import path
from holograms.views.api_view import hologram_list, hologram_detail
from holograms.views.hologram_order import HologramListView


app_name = 'holograms'
urlpatterns = [
    # Class-based view for sorting and filtering holograms
    path('holograms/', HologramListView.as_view(), name='hologram-list'),
    # path('holograms/', hologram_list, name='hologram-list'),
    
    # View for hologram detail
    path('holograms/<int:pk>/', hologram_detail, name='hologram-detail'),
]
