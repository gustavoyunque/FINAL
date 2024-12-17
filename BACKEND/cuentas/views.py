from rest_framework import viewsets, permissions
from .models import Cuenta
from .serializers import CuentaSerializer

class AccountViewSet(viewsets.ModelViewSet):
    """
    Vista para gestión de cuentas bancarias
    """
    queryset = Cuenta.objects.all()
    serializer_class = CuentaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Filtrar cuentas del usuario actual
        """
        return self.queryset.filter(usuario=self.request.user)