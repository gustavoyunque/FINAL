from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Informe
from .serializers import InformeSerializer
from transacciones.models import Transaccion

class InformesView(APIView):
    """
    Vista para generar informes
    """
    def get(self, request):
        fecha_inicio = request.query_params.get('fecha_inicio')
        fecha_fin = request.query_params.get('fecha_fin')

        ingresos_totales = Transaccion.objects.filter(
            tipo__in=['deposito', 'transferencia'], 
            fecha_transaccion__range=[fecha_inicio, fecha_fin]
        ).aggregate(total=Sum('monto'))['total'] or 0

        gastos_totales = Transaccion.objects.filter(
            tipo__in=['retiro', 'pago'], 
            fecha_transaccion__range=[fecha_inicio, fecha_fin]
        ).aggregate(total=Sum('monto'))['total'] or 0

        saldo_neto = ingresos_totales - gastos_totales

        informe = Informe.objects.create(
            fecha_inicio=fecha_inicio,
            fecha_fin=fecha_fin,
            ingresos_totales=ingresos_totales,
            gastos_totales=gastos_totales,
            saldo_neto=saldo_neto
        )

        serializer = InformeSerializer(informe)
        return Response(serializer.data)