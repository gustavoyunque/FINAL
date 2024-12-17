from django.urls import path
from . import views

urlpatterns = [
    path('presupuestos/', views.PresupuestosView.as_view(), name='presupuestos'),
]