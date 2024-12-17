from rest_framework import serializers
from .models import Recordatorio

class RecordatorioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recordatorio
        fields = ['id', 'titulo', 'fecha']