# Generated by Django 5.1.4 on 2024-12-13 04:00

import django.core.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Cuenta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numero_cuenta', models.CharField(max_length=20, unique=True, verbose_name='Número de Cuenta')),
                ('tipo_cuenta', models.CharField(choices=[('corriente', 'Cuenta Corriente'), ('ahorro', 'Cuenta de Ahorro'), ('empresarial', 'Cuenta Empresarial')], max_length=15, verbose_name='Tipo de Cuenta')),
                ('estado', models.CharField(choices=[('activa', 'Activa'), ('bloqueada', 'Bloqueada'), ('inactiva', 'Inactiva')], default='activa', max_length=15, verbose_name='Estado de la Cuenta')),
                ('saldo', models.DecimalField(decimal_places=2, default=0.0, max_digits=15, validators=[django.core.validators.MinValueValidator(0.0)], verbose_name='Saldo')),
                ('fecha_apertura', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Apertura')),
                ('fecha_ultima_transaccion', models.DateTimeField(blank=True, null=True, verbose_name='Fecha Última Transacción')),
                ('limite_diario', models.DecimalField(decimal_places=2, default=1000.0, max_digits=10, verbose_name='Límite Diario de Transacción')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cuentas', to=settings.AUTH_USER_MODEL, verbose_name='Titular de la Cuenta')),
            ],
            options={
                'verbose_name': 'Cuenta Bancaria',
                'verbose_name_plural': 'Cuentas Bancarias',
                'ordering': ['-fecha_apertura'],
            },
        ),
    ]