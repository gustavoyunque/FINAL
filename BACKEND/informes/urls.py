from django.urls import path
from . import views

urlpatterns = [
    path('informes/', views.InformesView.as_view(), name='informes'),
]