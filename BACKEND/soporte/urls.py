from django.urls import path
from . import views

urlpatterns = [
    path('soporte/', views.SoporteView.as_view(), name='soporte'),
]