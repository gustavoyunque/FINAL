# models.py
from django.conf import settings
from django.db import models
from django.core.validators import MinValueValidator
from decimal import Decimal

class Informe(models.Model):
    TIPO_INFORME = [
        ('PRESTAMOS', 'Informe de Préstamos'),
        ('TRANSACCIONES', 'Informe de Transacciones'),
        ('CUENTAS', 'Estado de Cuentas'),
        ('GENERAL', 'Informe General'),
    ]

    FORMATO_INFORME = [
        ('PDF', 'PDF'),
        ('EXCEL', 'Excel'),
        ('CSV', 'CSV'),
    ]

    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='informes',  # Corregida la coma faltante aquí
        null=True,
    )
    tipo = models.CharField(
        max_length=20,
        choices=TIPO_INFORME,
        default='GENERAL'
    )
    formato = models.CharField(
        max_length=10,
        choices=FORMATO_INFORME,
        default='PDF'
    )
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    fecha_generacion = models.DateTimeField(auto_now_add=True)
    archivo_generado = models.FileField(
        upload_to='informes/',
        null=True,
        blank=True
    )
    estado = models.CharField(
        max_length=20,
        choices=[
            ('PENDIENTE', 'Pendiente'),
            ('GENERANDO', 'Generando'),
            ('COMPLETADO', 'Completado'),
            ('ERROR', 'Error'),
        ],
        default='PENDIENTE'
    )
    mensaje_error = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ['-fecha_generacion']
        verbose_name = 'Informe'
        verbose_name_plural = 'Informes'

    def __str__(self):
        return f"Informe {self.tipo} - {self.fecha_inicio} a {self.fecha_fin}"

class InformeDetalle(models.Model):
    informe = models.ForeignKey(
        Informe,
        on_delete=models.CASCADE,
        related_name='detalles'
    )
    seccion = models.CharField(max_length=100)
    total = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=Decimal('0.00'),
        validators=[MinValueValidator(Decimal('0.00'))]
    )
    cantidad_registros = models.IntegerField(default=0)
    metadata = models.JSONField(default=dict)

    def __str__(self):
        return f"Detalle {self.seccion} - {self.informe}"