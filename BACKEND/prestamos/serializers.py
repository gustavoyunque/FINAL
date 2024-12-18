from rest_framework import serializers
from .models import Prestamo

class PrestamoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prestamo
        fields = [
            'id', 'usuario', 'monto', 'plazo', 'tasa_interes',
            'saldo_pendiente', 'cuota', 'estado', 'fecha_creacion'
        ]
        read_only_fields = ['usuario', 'fecha_creacion', 'cuota', 'saldo_pendiente']

    def create(self, validated_data):
        try:
            prestamo = Prestamo(**validated_data)
            prestamo.cuota = prestamo.calcular_cuota()
            prestamo.saldo_pendiente = round(prestamo.cuota * prestamo.plazo, 2)
            prestamo.save()
            return prestamo
        except Exception as e:
            raise serializers.ValidationError(f"Error al crear el préstamo: {str(e)}")
