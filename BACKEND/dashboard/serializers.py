from rest_framework import serializers
from .models import DashboardData
from transacciones.serializers import TransaccionSerializer
from prestamos.serializers import PrestamoSerializer

class DashboardDataSerializer(serializers.ModelSerializer):
    transacciones_recientes = TransaccionSerializer(many=True)
    prestamos_activos = PrestamoSerializer(many=True)

    class Meta:
        model = DashboardData
        fields = ['total_cuentas', 'balance_total', 'transacciones_recientes', 'prestamos_activos']