from rest_framework import serializers
from .models import Personalizacion

class PersonalizacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personalizacion
        fields = ['tema', 'fuente', 'layout']