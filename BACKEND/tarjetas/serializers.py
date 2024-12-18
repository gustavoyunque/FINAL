# serializers.py
from rest_framework import serializers
from .models import Tarjeta

class TarjetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarjeta
        fields = ['id', 'numero', 'titular', 'fecha_vencimiento', 'estado', 'usuario']
        read_only_fields = ['id', 'usuario', 'estado']
