from django.db import models
from usuarios.models import Usuario

class Personalizacion(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, related_name='personalizacion')
    tema = models.CharField(max_length=50, default='light')
    fuente = models.CharField(max_length=50, default='default')
    layout = models.CharField(max_length=50, default='default')