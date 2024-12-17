from django.urls import path
from . import views

urlpatterns = [
    path('transferencias/', views.TransferenciaView.as_view(), name='transferencias'),
]