# soporte/serializers.py
from rest_framework import serializers
from .models import Solicitud

class SolicitudSerializer(serializers.ModelSerializer):
    usuario_nombre = serializers.CharField(source='usuario.nombre', read_only=True)
    
    class Meta:
        model = Solicitud
        fields = ['id', 'usuario_nombre', 'nombre', 'email', 'asunto', 'mensaje', 'fecha']
        read_only_fields = ['usuario']