# models.py
from django.conf import settings
from django.db import models
from django.core.validators import MinValueValidator
from decimal import Decimal

class Categoria(models.Model):
    TIPO_CATEGORIA = [
        ('INGRESO', 'Ingreso'),
        ('GASTO', 'Gasto'),
    ]
    
    nombre = models.CharField(max_length=100)
    tipo = models.CharField(
        max_length=10, 
        choices=TIPO_CATEGORIA,
        default='GASTO'
    )
    icono = models.CharField(max_length=50, blank=True, null=True)
    color = models.CharField(max_length=7, default="#000000")
    
    class Meta:
        verbose_name = 'Categoría'
        verbose_name_plural = 'Categorías'
        ordering = ['nombre']

    def __str__(self):
        return f"{self.nombre} ({self.get_tipo_display()})"

class Presupuesto(models.Model):
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='presupuestos'
    )
    nombre = models.CharField(max_length=100)
    fecha_inicio = models.DateField(null=True, blank=True)  # Añadido null=True
    fecha_fin = models.DateField(null=True, blank=True)     
    monto_total = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.00'))],
        default=0.00  # Añadimos este default temporalmente
    )
    descripcion = models.TextField(blank=True)
    activo = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Presupuesto'
        verbose_name_plural = 'Presupuestos'
        ordering = ['-fecha_inicio']

    def __str__(self):
        return f"{self.nombre} - {self.usuario.username}"

    def get_monto_utilizado(self):
        return sum(cat.monto_utilizado for cat in self.categorias.all())

    def get_porcentaje_utilizado(self):
        if self.monto_total == 0:
            return 0
        return (self.get_monto_utilizado() / self.monto_total) * 100

class PresupuestoCategoria(models.Model):
    presupuesto = models.ForeignKey(
        Presupuesto,
        on_delete=models.CASCADE,
        related_name='categorias'
    )
    categoria = models.ForeignKey(
        Categoria,
        on_delete=models.PROTECT
    )
    monto_asignado = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.00'))]
    )
    monto_utilizado = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=Decimal('0.00'),
        validators=[MinValueValidator(Decimal('0.00'))]
    )
    alerta_porcentaje = models.IntegerField(
        default=80,
        validators=[MinValueValidator(1)]
    )

    class Meta:
        verbose_name = 'Categoría de Presupuesto'
        verbose_name_plural = 'Categorías de Presupuesto'
        unique_together = ['presupuesto', 'categoria']

    def __str__(self):
        return f"{self.categoria.nombre} en {self.presupuesto.nombre}"

    def get_porcentaje_utilizado(self):
        if self.monto_asignado == 0:
            return 0
        return (self.monto_utilizado / self.monto_asignado) * 100