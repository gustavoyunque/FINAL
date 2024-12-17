from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Solicitud
from .serializers import SolicitudSerializer

class SoporteView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        usuario = request.user
        solicitudes = usuario.solicitudes.all()
        serializer = SolicitudSerializer(solicitudes, many=True)
        return Response(serializer.data)

    def post(self, request):
        usuario = request.user
        serializer = SolicitudSerializer(data=request.data)
        if serializer.is_valid():
            solicitud = serializer.save(usuario=usuario)
            return Response(serializer.data, status=201)
        return Response({'error': serializer.errors}, status=400)