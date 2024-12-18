from django.conf import settings
from django.db import models
from django.utils import timezone
from decimal import Decimal

class Prestamo(models.Model):
    ESTADOS = [
        ('pendiente', 'Pendiente'),
        ('activo', 'Activo'),
        ('completado', 'Completado'),
    ]

    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='prestamos'
    )
    monto = models.DecimalField(max_digits=12, decimal_places=2)
    plazo = models.PositiveIntegerField(help_text="Plazo en meses")
    tasa_interes = models.DecimalField(max_digits=5, decimal_places=2)
    cuota = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    saldo_pendiente = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    fecha_creacion = models.DateTimeField(default=timezone.now)
    estado = models.CharField(max_length=20, choices=ESTADOS, default='pendiente')

    def calcular_cuota(self):
        """
        Calcula la cuota mensual considerando la tasa de interés usando Decimal.
        """
        try:
            tasa_mensual = (self.tasa_interes / Decimal(100)) / Decimal(12)
            if tasa_mensual > 0:
                cuota = self.monto * (tasa_mensual * (Decimal(1) + tasa_mensual) ** self.plazo) / (
                    (Decimal(1) + tasa_mensual) ** self.plazo - Decimal(1)
                )
            else:
                cuota = self.monto / self.plazo
            return cuota.quantize(Decimal('0.01'))  # Redondear a 2 decimales
        except Exception as e:
            print(f"Error al calcular la cuota: {e}")
            return Decimal(0)

    def save(self, *args, **kwargs):
        """
        Guarda el préstamo y calcula la cuota y el saldo pendiente.
        """
        self.cuota = self.calcular_cuota()  # Calcular la cuota
        self.saldo_pendiente = (self.cuota * Decimal(self.plazo)).quantize(Decimal('0.01'))  # Saldo pendiente = Cuota * Plazo
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Préstamo de {self.monto} ({self.estado})"
