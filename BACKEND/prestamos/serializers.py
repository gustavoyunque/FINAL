from rest_framework import serializers
from .models import Prestamo

class PrestamoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prestamo
        fields = [
            'id',
            'usuario',
            'cuenta_asociada',
            'monto_solicitado',
            'monto_aprobado',
            'tipo_prestamo',
            'estado',
            'tasa_interes',
            'plazo_meses',
            'fecha_solicitud',
            'fecha_aprobacion'
        ]