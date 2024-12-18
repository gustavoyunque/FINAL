# serializers.py
from rest_framework import serializers
from .models import Categoria, Presupuesto, PresupuestoCategoria

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nombre', 'tipo', 'icono', 'color']

class PresupuestoCategoriaSerializer(serializers.ModelSerializer):
    categoria_nombre = serializers.CharField(source='categoria.nombre', read_only=True)
    categoria_color = serializers.CharField(source='categoria.color', read_only=True)
    porcentaje_utilizado = serializers.SerializerMethodField()

    class Meta:
        model = PresupuestoCategoria
        fields = ['id', 'categoria', 'categoria_nombre', 'categoria_color',
                 'monto_asignado', 'monto_utilizado', 'alerta_porcentaje',
                 'porcentaje_utilizado']

    def get_porcentaje_utilizado(self, obj):
        return obj.get_porcentaje_utilizado()

class PresupuestoSerializer(serializers.ModelSerializer):
    categorias = PresupuestoCategoriaSerializer(many=True, read_only=True)
    monto_utilizado = serializers.SerializerMethodField()
    porcentaje_utilizado = serializers.SerializerMethodField()

    class Meta:
        model = Presupuesto
        fields = ['id', 'nombre', 'fecha_inicio', 'fecha_fin', 'monto_total',
                 'descripcion', 'activo', 'fecha_creacion', 'categorias',
                 'monto_utilizado', 'porcentaje_utilizado']
        read_only_fields = ['fecha_creacion']

    def get_monto_utilizado(self, obj):
        return obj.get_monto_utilizado()

    def get_porcentaje_utilizado(self, obj):
        return obj.get_porcentaje_utilizado()

    def validate(self, data):
        if data.get('fecha_inicio') and data.get('fecha_fin'):
            if data['fecha_inicio'] > data['fecha_fin']:
                raise serializers.ValidationError(
                    "La fecha de inicio debe ser anterior a la fecha final"
                )
        return data