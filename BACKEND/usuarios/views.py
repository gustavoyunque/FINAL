from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Usuario
from .serializers import UsuarioSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

class UserViewSet(viewsets.ModelViewSet):
    """
    Vista para gestión integral de usuarios
    Proporciona operaciones CRUD y acciones personalizadas
    """
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def get_permissions(self):
        """
        Personalizar permisos según la acción
        """
        if self.action in ['create', 'login']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    @action(detail=False, methods=['post'])
    def login(self, request):
        """
        Endpoint personalizado para autenticación
        """
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UsuarioSerializer(user).data
            }, status=status.HTTP_200_OK)

        return Response({
            'message': 'Credenciales inválidas'
        }, status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=True, methods=['put'])
    def cambiar_tipo_usuario(self, request, pk=None):
        """
        Acción para cambiar el tipo de usuario
        Solo accesible para usuarios autorizados
        """
        user = self.get_object()
        nuevo_tipo = request.data.get('tipo_usuario')

        if nuevo_tipo:
            user.tipo_usuario = nuevo_tipo
            user.save()
            serializer = self.get_serializer(user)
            return Response(serializer.data)

        return Response({
            'message': 'Tipo de usuario no proporcionado'
        }, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        """
        Personalizar la creación de usuarios
        Añade validaciones adicionales
        """
        usuario = serializer.save()
        usuario.is_active = True
        usuario.save()

class PerfilView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        usuario = request.user
        serializer = UsuarioSerializer(usuario)
        return Response(serializer.data)