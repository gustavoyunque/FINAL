# Generated by Django 5.1.4 on 2024-12-18 12:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tarjetas', '0002_alter_tarjeta_options_remove_tarjeta_cuenta_asociada_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tarjeta',
            name='numero',
            field=models.CharField(max_length=16, unique=True),
        ),
        migrations.AlterField(
            model_name='tarjeta',
            name='titular',
            field=models.CharField(max_length=100),
        ),
    ]
