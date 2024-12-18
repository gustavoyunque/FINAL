from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum
from .models import Prestamo
from .serializers import PrestamoSerializer


class LoanViewSet(viewsets.ModelViewSet):
    """
    Vista para la gestión de préstamos
    """
    queryset = Prestamo.objects.all()
    serializer_class = PrestamoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Filtra préstamos del usuario autenticado.
        """
        return self.queryset.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        """
        Asigna el usuario autenticado al préstamo y calcula valores adicionales.
        """
        prestamo = serializer.save(usuario=self.request.user)
        prestamo.cuota = prestamo.calcular_cuota()  # Asegura el cálculo de la cuota
        prestamo.saldo_pendiente = round(prestamo.cuota * prestamo.plazo, 2)  # Actualiza el saldo pendiente
        prestamo.save()  # Guarda los valores calculados

    @action(detail=True, methods=['put'])
    def cambiar_estado(self, request, pk=None):
        """
        Permite cambiar el estado del préstamo.
        """
        prestamo = self.get_object()
        nuevo_estado = request.data.get('estado')

        if nuevo_estado in dict(Prestamo.ESTADOS).keys():
            prestamo.estado = nuevo_estado
            prestamo.save()
            return Response(self.get_serializer(prestamo).data, status=status.HTTP_200_OK)
        
        return Response({'error': 'Estado inválido'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def resumen(self, request):
        """
        Retorna el resumen de los préstamos.
        """
        prestamos = self.get_queryset()
        resumen = {
            'total_monto': prestamos.aggregate(total=Sum('monto'))['total'] or 0,
            'total_saldo_pendiente': prestamos.aggregate(total=Sum('saldo_pendiente'))['total'] or 0,
        }
        return Response(resumen, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        """
        Elimina un préstamo.
        """
        instance = self.get_object()
        instance.delete()
        return Response({'message': 'Préstamo eliminado correctamente'}, status=status.HTTP_204_NO_CONTENT)
