from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Transaccion
from .serializers import TransaccionSerializer
from cuentas.models import Cuenta

class TransactionViewSet(viewsets.ModelViewSet):
    """
    Vista para gestión de transacciones bancarias
    """
    queryset = Transaccion.objects.all()
    serializer_class = TransaccionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Filtrar transacciones relacionadas con las cuentas del usuario
        """
        user_accounts = Cuenta.objects.filter(usuario=self.request.user)
        return self.queryset.filter(
            cuenta_origen__in=user_accounts
        )

    @action(detail=False, methods=['get'])
    def ultimas_transacciones(self, request):
        """
        Obtener las últimas 10 transacciones del usuario
        """
        user_accounts = Cuenta.objects.filter(usuario=request.user)
        transacciones = self.queryset.filter(
            cuenta_origen__in=user_accounts
        ).order_by('-fecha_transaccion')[:10]

        serializer = self.get_serializer(transacciones, many=True)
        return Response(serializer.data)

    def create(self, request):
        """
        Personalizar creación de transacciones
        Añadir validaciones de negocio
        """
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            
            transaccion = serializer.save()
            transaccion.procesar_transaccion()
            
            return Response(
                serializer.data, 
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_400_BAD_REQUEST
            )