# models.py
from django.conf import settings
from django.db import models
from django.utils import timezone

class Tarjeta(models.Model):
    ESTADOS = [
        ('activa', 'Activa'),
        ('inactiva', 'Inactiva'),
        ('bloqueada', 'Bloqueada'),
    ]
    
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='tarjetas'
    )
    numero = models.CharField(max_length=16, unique=True)
    titular = models.CharField(max_length=100)
    fecha_vencimiento = models.DateField()
    estado = models.CharField(max_length=10, choices=ESTADOS, default='activa')
    fecha_creacion = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"Tarjeta {self.numero[-4:]} - {self.estado}"



