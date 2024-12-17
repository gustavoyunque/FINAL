from django.db import models
from usuarios.models import Usuario

class Recordatorio(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='recordatorios')
    titulo = models.CharField(max_length=100)
    fecha = models.DateField()