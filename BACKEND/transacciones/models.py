from django.db import models
from usuarios.models import Usuario
from cuentas.models import Cuenta

class Transaccion(models.Model):
    TIPO_TRANSACCION = (
        ('deposito', 'Depósito'),
        ('retiro', 'Retiro'),
        ('transferencia', 'Transferencia'),
    )
    usuario = models.ForeignKey(
    Usuario,
    on_delete=models.CASCADE,
    default=1,  # ID de un usuario existente en la base de datos
    verbose_name='Usuario relacionado'
)

    cuenta_origen = models.ForeignKey(
        Cuenta, on_delete=models.CASCADE, related_name='transacciones_origen'
    )
    cuenta_destino = models.ForeignKey(
        Cuenta, null=True, blank=True, on_delete=models.CASCADE, related_name='transacciones_destino'
    )
    tipo = models.CharField(max_length=15, choices=TIPO_TRANSACCION)
    monto = models.DecimalField(max_digits=15, decimal_places=2)
    fecha = models.DateTimeField(auto_now_add=True)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.tipo} - {self.monto} - {self.fecha}"
