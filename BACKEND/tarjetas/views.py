# views.py
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status
from .models import Tarjeta
from .serializers import TarjetaSerializer

class TarjetaViewSet(viewsets.ModelViewSet):
    serializer_class = TarjetaSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Tarjeta.objects.filter(usuario=self.request.user)
    
    def create(self, request, *args, **kwargs):
        print("Datos recibidos:", request.data)  # Para debugging
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
    
    def destroy(self, request, *args, **kwargs):
        tarjeta = self.get_object()
        tarjeta.delete()
        return Response(
            {"message": "Tarjeta eliminada correctamente"},
            status=status.HTTP_204_NO_CONTENT
        )
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
