from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Tarjeta
from .serializers import TarjetaSerializer

class CardViewSet(viewsets.ModelViewSet):
    """
    Vista para gestión de tarjetas bancarias
    """
class CardViewSet(viewsets.ModelViewSet):
    queryset = Tarjeta.objects.all()
    serializer_class = TarjetaSerializer
    permission_classes = [permissions.IsAuthenticated]



    def get_queryset(self):
        """
        Filtrar tarjetas del usuario actual
        """
        return self.queryset.filter(usuario=self.request.user)

    @action(detail=True, methods=['put'])
    def bloquear_tarjeta(self, request, pk=None):
        """
        Bloquear una tarjeta específica
        """
        tarjeta = self.get_object()
        tarjeta.estado = 'bloqueada'
        tarjeta.save()
        
        serializer = self.get_serializer(tarjeta)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def tarjetas_activas(self, request):
        """
        Obtener tarjetas activas del usuario
        """
        tarjetas = self.queryset.filter(
            usuario=request.user, 
            estado='activa'
        )
        
        serializer = self.get_serializer(tarjetas, many=True)
        return Response(serializer.data)