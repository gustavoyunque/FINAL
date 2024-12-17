from rest_framework import serializers
from .models import Cuenta

class CuentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuenta
        fields = [
            'id',
            'usuario',
            'numero_cuenta',
            'tipo_cuenta',
            'estado',
            'saldo',
            'fecha_apertura',
            'fecha_ultima_transaccion',
            'limite_diario'
        ]
        read_only_fields = ['numero_cuenta', 'fecha_apertura']