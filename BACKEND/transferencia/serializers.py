from rest_framework import serializers
from .models import Transferencia

class TransferenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transferencia
        fields = ['id', 'cuenta_origen', 'cuenta_destino', 'monto', 'fecha']