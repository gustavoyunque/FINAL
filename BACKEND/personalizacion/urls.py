from django.urls import path
from . import views

urlpatterns = [
    path('personalizacion/', views.PersonalizacionView.as_view(), name='personalizacion'),
]