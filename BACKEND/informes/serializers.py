from rest_framework import serializers
from .models import Informe

class InformeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Informe
        fields = ['fecha_inicio', 'fecha_fin', 'ingresos_totales', 'gastos_totales', 'saldo_neto']