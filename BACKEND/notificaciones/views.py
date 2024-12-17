from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Notificacion
from .serializers import NotificacionSerializer

class NotificacionesView(APIView):
    """
    Vista para obtener las notificaciones del usuario
    """
    def get(self, request):
        usuario = request.user
        notificaciones = usuario.notificaciones.all()
        serializer = NotificacionSerializer(notificaciones, many=True)
        return Response(serializer.data)