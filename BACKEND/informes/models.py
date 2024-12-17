from django.db import models
from transacciones.models import Transaccion

class Informe(models.Model):
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    ingresos_totales = models.DecimalField(max_digits=15, decimal_places=2)
    gastos_totales = models.DecimalField(max_digits=15, decimal_places=2)
    saldo_neto = models.DecimalField(max_digits=15, decimal_places=2)