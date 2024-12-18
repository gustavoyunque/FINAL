from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum, Q
from .models import Transaccion
from .serializers import TransaccionSerializer

class TransaccionViewSet(viewsets.ModelViewSet):
    """
    Vista para la gestión de transacciones.
    """
    queryset = Transaccion.objects.all()
    serializer_class = TransaccionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Filtra transacciones según los parámetros de consulta.
        """
        queryset = Transaccion.objects.filter(usuario=self.request.user)
        tipo = self.request.query_params.get('tipo')
        cuenta_origen = self.request.query_params.get('cuenta_origen')
        cuenta_destino = self.request.query_params.get('cuenta_destino')
        fecha_inicio = self.request.query_params.get('fecha_inicio')
        fecha_fin = self.request.query_params.get('fecha_fin')

        if tipo:
            queryset = queryset.filter(tipo=tipo)
        if cuenta_origen:
            queryset = queryset.filter(cuenta_origen=cuenta_origen)
        if cuenta_destino:
            queryset = queryset.filter(cuenta_destino=cuenta_destino)
        if fecha_inicio and fecha_fin:
            queryset = queryset.filter(fecha__range=[fecha_inicio, fecha_fin])

        return queryset

    @action(detail=False, methods=['get'])
    def resumen(self, request):
        """
        Retorna un resumen estadístico de las transacciones del usuario autenticado.
        """
        usuario = self.request.user
        resumen = Transaccion.objects.filter(usuario=usuario).aggregate(
            total_depositos=Sum('monto', filter=Q(tipo='deposito')),
            total_retiros=Sum('monto', filter=Q(tipo='retiro')),
            total_transferencias=Sum('monto', filter=Q(tipo='transferencia')),
        )

        balance = (resumen['total_depositos'] or 0) - (resumen['total_retiros'] or 0)

        return Response({
            'total_depositos': resumen['total_depositos'] or 0,
            'total_retiros': resumen['total_retiros'] or 0,
            'total_transferencias': resumen['total_transferencias'] or 0,
            'balance': balance,
        })
