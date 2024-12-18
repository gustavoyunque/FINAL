from django.urls import path
from . import views

urlpatterns = [
    path('', views.SoporteView.as_view(), name='soporte'),
]