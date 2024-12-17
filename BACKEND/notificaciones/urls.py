from django.urls import path
from . import views

urlpatterns = [
    path('notificaciones/', views.NotificacionesView.as_view(), name='notificaciones'),
]