# Generated by Django 5.1.4 on 2024-12-18 09:25

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('prestamos', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='prestamo',
            options={},
        ),
        migrations.RemoveField(
            model_name='prestamo',
            name='cuenta_asociada',
        ),
        migrations.RemoveField(
            model_name='prestamo',
            name='fecha_aprobacion',
        ),
        migrations.RemoveField(
            model_name='prestamo',
            name='fecha_primer_pago',
        ),
        migrations.RemoveField(
            model_name='prestamo',
            name='fecha_solicitud',
        ),
        migrations.RemoveField(
            model_name='prestamo',
            name='monto_aprobado',
        ),
        migrations.RemoveField(
            model_name='prestamo',
            name='monto_solicitado',
        ),
        migrations.RemoveField(
            model_name='prestamo',
            name='plazo_meses',
        ),
        migrations.RemoveField(
            model_name='prestamo',
            name='tipo_prestamo',
        ),
        migrations.AddField(
            model_name='prestamo',
            name='cuota',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=12, null=True),
        ),
        migrations.AddField(
            model_name='prestamo',
            name='fecha_creacion',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='prestamo',
            name='monto',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12),
        ),
        migrations.AddField(
            model_name='prestamo',
            name='plazo',
            field=models.PositiveIntegerField(default=12, help_text='Plazo en meses'),
        ),
        migrations.AddField(
            model_name='prestamo',
            name='saldo_pendiente',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=12, null=True),
        ),
        migrations.AlterField(
            model_name='prestamo',
            name='estado',
            field=models.CharField(choices=[('pendiente', 'Pendiente'), ('activo', 'Activo'), ('completado', 'Completado')], default='pendiente', max_length=20),
        ),
        migrations.AlterField(
            model_name='prestamo',
            name='tasa_interes',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=5),
        ),
        migrations.AlterField(
            model_name='prestamo',
            name='usuario',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='prestamos', to=settings.AUTH_USER_MODEL),
        ),
    ]
