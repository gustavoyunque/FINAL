from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Recordatorio
from .serializers import RecordatorioSerializer

class RecordatoriosView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        usuario = request.user
        recordatorios = usuario.recordatorios.all()
        serializer = RecordatorioSerializer(recordatorios, many=True)
        return Response(serializer.data)

    def post(self, request):
        usuario = request.user
        serializer = RecordatorioSerializer(data=request.data)
        if serializer.is_valid():
            recordatorio = serializer.save(usuario=usuario)
            return Response(serializer.data, status=201)
        return Response({'error': serializer.errors}, status=400)