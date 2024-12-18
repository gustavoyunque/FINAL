# views.py
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Alerta
from .serializers import AlertaSerializer

class AlertaViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar alertas.
    Permite crear, leer, actualizar y eliminar alertas de usuario.
    """
    serializer_class = AlertaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Filtra las alertas por el usuario autenticado.
        """
        return Alerta.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        """
        Asigna el usuario autenticado al crear una alerta.
        """
        # Verificar si el usuario ya tiene una alerta
        if Alerta.objects.filter(usuario=self.request.user).exists():
            raise serializers.ValidationError(
                "Ya existe una alerta para este usuario. Use PUT para actualizar."
            )
        serializer.save(usuario=self.request.user)

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except serializers.ValidationError as e:
            return Response(
                {'detail': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )