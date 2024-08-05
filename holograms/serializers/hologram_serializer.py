from rest_framework import serializers
from holograms.models.hologram_model import Hologram

class HologramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hologram
        fields = '__all__'