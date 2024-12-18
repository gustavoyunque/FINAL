from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Cuenta
from .serializers import CuentaSerializer

class AccountViewSet(viewsets.ModelViewSet):
    """
    Vista para la gestión de cuentas bancarias
    """
    queryset = Cuenta.objects.all()
    serializer_class = CuentaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Retorna solo las cuentas del usuario autenticado.
        """
        user = self.request.user
        queryset = Cuenta.objects.filter(usuario=user)

        # Filtrar por estado si se proporciona en el parámetro de consulta
        estado = self.request.query_params.get('estado')
        if estado:
            queryset = queryset.filter(estado=estado)

        return queryset

    def perform_create(self, serializer):
        """
        Asigna el usuario autenticado al crear una cuenta.
        """
        serializer.save(usuario=self.request.user)

    @action(detail=False, methods=['get'])
    def filtrar_activos(self, request):
        """
        Filtra las cuentas activas del usuario autenticado.
        """
        cuentas_activas = self.get_queryset().filter(estado='activa')
        serializer = self.get_serializer(cuentas_activas, many=True)
        return Response(serializer.data)
    def destroy(self, request, *args, **kwargs):
       
        instance = self.get_object()
        instance.delete()
        return Response({'detail': 'Cuenta eliminada exitosamente.'}, status=status.HTTP_204_NO_CONTENT)
