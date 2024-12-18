from rest_framework import serializers
from .models import Transaccion
from cuentas.models import Cuenta

class TransaccionSerializer(serializers.ModelSerializer):
    cuenta_origen = serializers.SlugRelatedField(
        queryset=Cuenta.objects.all(), slug_field='numero_cuenta'
    )
    cuenta_destino = serializers.SlugRelatedField(
        queryset=Cuenta.objects.all(), slug_field='numero_cuenta', required=False, allow_null=True
    )

    class Meta:
        model = Transaccion
        fields = [
            'id', 'usuario', 'cuenta_origen', 'cuenta_destino',
            'tipo', 'monto', 'fecha', 'descripcion'
        ]
        read_only_fields = ['usuario', 'fecha']
