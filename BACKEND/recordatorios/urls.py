from django.urls import path
from . import views

urlpatterns = [
    path('recordatorios/', views.RecordatoriosView.as_view(), name='recordatorios'),
]