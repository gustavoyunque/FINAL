from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Presupuesto
from .serializers import PresupuestoSerializer

class PresupuestosView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        usuario = request.user
        presupuestos = usuario.presupuestos.all()
        serializer = PresupuestoSerializer(presupuestos, many=True)
        return Response(serializer.data)

    def post(self, request):
        usuario = request.user
        serializer = PresupuestoSerializer(data=request.data)
        if serializer.is_valid():
            presupuesto = serializer.save(usuario=usuario)
            return Response(serializer.data, status=201)
        return Response({'error': serializer.errors}, status=400)