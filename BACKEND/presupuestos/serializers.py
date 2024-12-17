from rest_framework import serializers
from .models import Presupuesto

class PresupuestoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Presupuesto
        fields = ['id', 'categoria', 'monto']