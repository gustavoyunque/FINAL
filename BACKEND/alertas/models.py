# models.py
from django.conf import settings
from django.db import models

class Alerta(models.Model):
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='alertas'
    )
    saldo_minimo = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        help_text="Saldo mínimo para recibir alertas"
    )
    notificar_transacciones = models.BooleanField(
        default=False,
        help_text="Activar notificaciones para transacciones sospechosas"
    )
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Alerta"
        verbose_name_plural = "Alertas"
        ordering = ['-fecha_creacion']

    def __str__(self):
        return f"Alerta de {self.usuario.username} - Saldo: {self.saldo_minimo}"
