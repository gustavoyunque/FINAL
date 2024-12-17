from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Prestamo
from .serializers import PrestamoSerializer

class LoanViewSet(viewsets.ModelViewSet):
    """
    Vista para gestión de préstamos bancarios
    """
    queryset = Prestamo.objects.all()
    serializer_class = PrestamoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Filtrar préstamos del usuario actual
        """
        return self.queryset.filter(usuario=self.request.user)

    @action(detail=True, methods=['put'])
    def cambiar_estado(self, request, pk=None):
        """
        Cambiar el estado de un préstamo
        Solo para usuarios con permisos especiales
        """
        prestamo = self.get_object()
        nuevo_estado = request.data.get('estado')

        if nuevo_estado:
            prestamo.estado = nuevo_estado
            prestamo.save()
            
            serializer = self.get_serializer(prestamo)
            return Response(serializer.data)
        
        return Response(
            {'error': 'Estado no proporcionado'}, 
            status=status.HTTP_400_BAD_REQUEST
        )

    @action(detail=False, methods=['get'])
    def prestamos_activos(self, request):
        """
        Obtener préstamos activos del usuario
        """
        prestamos = self.queryset.filter(
            usuario=request.user, 
            estado__in=['aprobado', 'activo']
        )
        
        serializer = self.get_serializer(prestamos, many=True)
        return Response(serializer.data)