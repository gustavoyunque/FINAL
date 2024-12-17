from django.db import models
from cuentas.models import Cuenta
from transacciones.models import Transaccion
from prestamos.models import Prestamo

class DashboardData(models.Model):
    total_cuentas = models.IntegerField()
    balance_total = models.DecimalField(max_digits=15, decimal_places=2)
    transacciones_recientes = models.ManyToManyField(Transaccion, related_name='dashboard_transacciones')
    prestamos_activos = models.ManyToManyField(Prestamo, related_name='dashboard_prestamos')