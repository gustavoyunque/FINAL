from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Transferencia
from .serializers import TransferenciaSerializer

class TransferenciaView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = TransferenciaSerializer(data=request.data)
        if serializer.is_valid():
            transferencia = serializer.save()
            # Actualizar los saldos de las cuentas involucradas
            transferencia.cuenta_origen.actualizar_saldo(-transferencia.monto)
            transferencia.cuenta_destino.actualizar_saldo(transferencia.monto)
            return Response(serializer.data, status=201)
        return Response({'error': serializer.errors}, status=400)