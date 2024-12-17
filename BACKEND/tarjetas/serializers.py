from rest_framework import serializers
from .models import Tarjeta

class TarjetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarjeta
        fields = [
            'id',
            'usuario',
            'cuenta_asociada',
            'numero_tarjeta',
            'tipo_tarjeta',
            'estado',
            'fecha_emision',
            'fecha_vencimiento',
            'limite_credito',
            'saldo_disponible'
        ]