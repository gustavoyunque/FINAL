# Generated by Django 5.1.4 on 2024-12-18 05:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cuentas', '0002_cuenta_moneda'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cuenta',
            name='moneda',
        ),
        migrations.AlterField(
            model_name='cuenta',
            name='fecha_ultima_transaccion',
            field=models.DateTimeField(blank=True, null=True, verbose_name='Última Transacción'),
        ),
    ]
