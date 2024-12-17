from django.db import models
from usuarios.models import Usuario

class Presupuesto(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='presupuestos')
    categoria = models.CharField(max_length=100)
    monto = models.DecimalField(max_digits=10, decimal_places=2)