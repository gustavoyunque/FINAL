# serializers.py
from rest_framework import serializers
from .models import Informe, InformeDetalle

class InformeDetalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = InformeDetalle
        fields = ['id', 'seccion', 'total', 'cantidad_registros', 'metadata']
        read_only_fields = ['id']

class InformeSerializer(serializers.ModelSerializer):
    detalles = InformeDetalleSerializer(many=True, read_only=True)
    
    class Meta:
        model = Informe
        fields = ['id', 'tipo', 'formato', 'fecha_inicio', 'fecha_fin',
                 'fecha_generacion', 'archivo_generado', 'estado',
                 'mensaje_error', 'detalles']
        read_only_fields = ['id', 'fecha_generacion', 'archivo_generado',
                           'estado', 'mensaje_error']

    def validate(self, data):
        if data['fecha_inicio'] > data['fecha_fin']:
            raise serializers.ValidationError(
                "La fecha de inicio debe ser anterior a la fecha final"
            )
        return data