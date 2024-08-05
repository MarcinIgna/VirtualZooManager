from django.urls import path
from holograms.views.api_view import hologram_list, hologram_detail


app_name = 'holograms'
urlpatterns = [
    path('holograms/', hologram_list),
    path('holograms/<int:pk>/', hologram_detail),
]
