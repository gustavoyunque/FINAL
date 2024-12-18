from django.db import models
from django.core.validators import MinValueValidator
from usuarios.models import Usuario

class Cuenta(models.Model):
    TIPOS_CUENTA = (
        ('corriente', 'Cuenta Corriente'),
        ('ahorro', 'Cuenta de Ahorro'),
        ('empresarial', 'Cuenta Empresarial'),
    )

    MONEDAS = (
        ('USD', 'Dólar Americano'),
        ('EUR', 'Euro'),
        ('PEN', 'Sol Peruano'),
    )

    ESTADOS_CUENTA = (
        ('activa', 'Activa'),
        ('bloqueada', 'Bloqueada'),
        ('inactiva', 'Inactiva'),
    )

    usuario = models.ForeignKey(
        Usuario,
        on_delete=models.CASCADE,
        verbose_name='Titular de la Cuenta',
        related_name='cuentas'
    )
    numero_cuenta = models.CharField(
        max_length=20,
        unique=True,
        verbose_name='Número de Cuenta'
    )
    tipo_cuenta = models.CharField(
        max_length=15,
        choices=TIPOS_CUENTA,
        verbose_name='Tipo de Cuenta'
    )
    estado = models.CharField(
        max_length=15,
        choices=ESTADOS_CUENTA,
        default='activa',
        verbose_name='Estado de la Cuenta'
    )
    saldo = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        default=0.00,
        validators=[MinValueValidator(0.00)],
        verbose_name='Saldo'
    )
    limite_diario = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=1000.00,
        verbose_name='Límite Diario de Transacción'
    )
    moneda = models.CharField(
        max_length=3,
        choices=MONEDAS,
        default='USD',
        verbose_name='Moneda'
    )
    fecha_apertura = models.DateTimeField(
        verbose_name='Fecha de Apertura'
    )
    fecha_ultima_transaccion = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name='Última Transacción'
    )

    def __str__(self):
        return f"{self.numero_cuenta} - {self.usuario.username}"

    class Meta:
        verbose_name = 'Cuenta Bancaria'
        verbose_name_plural = 'Cuentas Bancarias'
        ordering = ['-fecha_apertura']
