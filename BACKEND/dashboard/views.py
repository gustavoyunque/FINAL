from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum
from decimal import Decimal
from cuentas.models import Cuenta
from transacciones.models import Transaccion
from prestamos.models import Prestamo

class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            # Usamos 'usuario' porque así está definido en tu modelo
            balance_total = Cuenta.objects.filter(
                usuario=request.user
            ).aggregate(total=Sum('saldo'))['total'] or Decimal('0.00')

            # Para transacciones, necesitamos ir a través de cuenta_origen
            transacciones_recientes = Transaccion.objects.filter(
                cuenta_origen__usuario=request.user
            ).order_by('-fecha_transaccion')[:5].values(
                'id', 
                'tipo', 
                'monto'
            )

            # También usamos 'usuario' en préstamos
            prestamos_activos = Prestamo.objects.filter(
                usuario=request.user,
                estado='activo'
            ).values(
                'id', 
                'tipo_prestamo', 
                'monto_aprobado'
            )

            data = {
                'balance_total': float(balance_total),
                'transacciones_recientes': list(transacciones_recientes),
                'prestamos_activos': list(prestamos_activos)
            }

            return Response(data)
            
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=500
            )