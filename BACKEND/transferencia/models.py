from django.db import models
from cuentas.models import Cuenta
from transacciones.models import Transaccion

class Transferencia(models.Model):
    cuenta_origen = models.ForeignKey(Cuenta, on_delete=models.CASCADE, related_name='transferencias_enviadas')
    cuenta_destino = models.ForeignKey(Cuenta, on_delete=models.CASCADE, related_name='transferencias_recibidas')
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    fecha = models.DateTimeField(auto_now_add=True)