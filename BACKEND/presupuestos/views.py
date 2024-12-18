# views.py
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum
from .models import Categoria, Presupuesto, PresupuestoCategoria
from .serializers import (CategoriaSerializer, PresupuestoSerializer,
                        PresupuestoCategoriaSerializer)

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [permissions.IsAuthenticated]

class PresupuestoViewSet(viewsets.ModelViewSet):
    serializer_class = PresupuestoSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Presupuesto.objects.all()

    def get_queryset(self):
        return Presupuesto.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

    @action(detail=True, methods=['post'])
    def asignar_categoria(self, request, pk=None):
        presupuesto = self.get_object()
        serializer = PresupuestoCategoriaSerializer(data=request.data)
        
        if serializer.is_valid():
            try:
                serializer.save(presupuesto=presupuesto)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response(
                    {'detail': str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def resumen(self, request, pk=None):
        presupuesto = self.get_object()
        categorias = presupuesto.categorias.all()
        
        resumen = {
            'monto_total': presupuesto.monto_total,
            'monto_utilizado': presupuesto.get_monto_utilizado(),
            'porcentaje_utilizado': presupuesto.get_porcentaje_utilizado(),
            'categorias_resumen': [
                {
                    'nombre': cat.categoria.nombre,
                    'monto_asignado': cat.monto_asignado,
                    'monto_utilizado': cat.monto_utilizado,
                    'porcentaje_utilizado': cat.get_porcentaje_utilizado()
                }
                for cat in categorias
            ]
        }
        
        return Response(resumen)