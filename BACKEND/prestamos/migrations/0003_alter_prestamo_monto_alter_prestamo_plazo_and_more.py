# Generated by Django 5.1.4 on 2024-12-18 10:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('prestamos', '0002_alter_prestamo_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='prestamo',
            name='monto',
            field=models.DecimalField(decimal_places=2, max_digits=12),
        ),
        migrations.AlterField(
            model_name='prestamo',
            name='plazo',
            field=models.PositiveIntegerField(help_text='Plazo en meses'),
        ),
        migrations.AlterField(
            model_name='prestamo',
            name='tasa_interes',
            field=models.DecimalField(decimal_places=2, max_digits=5),
        ),
    ]
