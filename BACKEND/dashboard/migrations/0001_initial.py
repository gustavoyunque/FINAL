# Generated by Django 5.1.4 on 2024-12-18 05:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('prestamos', '0001_initial'),
        ('transacciones', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='DashboardData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total_cuentas', models.IntegerField()),
                ('balance_total', models.DecimalField(decimal_places=2, max_digits=15)),
                ('prestamos_activos', models.ManyToManyField(related_name='dashboard_prestamos', to='prestamos.prestamo')),
                ('transacciones_recientes', models.ManyToManyField(related_name='dashboard_transacciones', to='transacciones.transaccion')),
            ],
        ),
    ]
