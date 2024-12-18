# Generated by Django 5.1.4 on 2024-12-18 05:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Informe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_inicio', models.DateField()),
                ('fecha_fin', models.DateField()),
                ('ingresos_totales', models.DecimalField(decimal_places=2, max_digits=15)),
                ('gastos_totales', models.DecimalField(decimal_places=2, max_digits=15)),
                ('saldo_neto', models.DecimalField(decimal_places=2, max_digits=15)),
            ],
        ),
    ]
