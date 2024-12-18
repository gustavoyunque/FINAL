# soporte/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Solicitud
from .serializers import SolicitudSerializer

class SoporteView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            usuario = request.user
            solicitudes = usuario.solicitudes.all()
            serializer = SolicitudSerializer(solicitudes, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {'error': 'Error al obtener las solicitudes', 'detail': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def post(self, request):
        try:
            serializer = SolicitudSerializer(data=request.data)
            if serializer.is_valid():
                solicitud = serializer.save(usuario=request.user)
                return Response(
                    serializer.data, 
                    status=status.HTTP_201_CREATED
                )
            return Response(
                {'error': 'Datos inválidos', 'detail': serializer.errors}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {'error': 'Error al crear la solicitud', 'detail': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )