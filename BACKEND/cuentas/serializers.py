from rest_framework import serializers
from .models import Cuenta

class CuentaSerializer(serializers.ModelSerializer):
    saldo = serializers.FloatField()
    limite_diario = serializers.FloatField()
    fecha_apertura = serializers.DateTimeField()  # Permite ingresar la fecha manualmente

    class Meta:
        model = Cuenta
        fields = [
            'id',
            'usuario',  # Incluye el usuario autenticado
            'numero_cuenta',
            'tipo_cuenta',
            'estado',
            'saldo',
            'fecha_apertura',
            'fecha_ultima_transaccion',
            'limite_diario',
            'moneda'
        ]
        read_only_fields = ['usuario', 'fecha_ultima_transaccion']  # Fecha apertura editable
