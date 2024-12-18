
# views.py
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import Informe, InformeDetalle
from .serializers import InformeSerializer, InformeDetalleSerializer
import asyncio

class InformeViewSet(viewsets.ModelViewSet):
    serializer_class = InformeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Informe.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        informe = serializer.save(
            usuario=self.request.user,
            estado='PENDIENTE'
        )
        # Iniciar generación asíncrona del informe
        self.generar_informe(informe)

    @action(detail=True, methods=['post'])
    def regenerar(self, request, pk=None):
        informe = self.get_object()
        informe.estado = 'PENDIENTE'
        informe.mensaje_error = None
        informe.save()
        # Reiniciar generación del informe
        self.generar_informe(informe)
        return Response({'status': 'Regeneración iniciada'})

    def generar_informe(self, informe):
        try:
            # Aquí iría la lógica de generación del informe
            # Por ejemplo, consultando préstamos, transacciones, etc.
            informe.estado = 'GENERANDO'
            informe.save()
            
            # Simular proceso de generación
            # En producción, esto debería ser una tarea asíncrona
            # por ejemplo usando Celery
            informe.estado = 'COMPLETADO'
            informe.save()
            
        except Exception as e:
            informe.estado = 'ERROR'
            informe.mensaje_error = str(e)
            informe.save()