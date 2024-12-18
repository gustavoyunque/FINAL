
# serializers.py
from rest_framework import serializers
from .models import Alerta

class AlertaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alerta
        fields = ['id', 'saldo_minimo', 'notificar_transacciones', 
                 'fecha_creacion', 'fecha_actualizacion']
        read_only_fields = ['id', 'fecha_creacion', 'fecha_actualizacion']
