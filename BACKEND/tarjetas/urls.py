from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TarjetaViewSet

router = DefaultRouter()
router.register('', TarjetaViewSet, basename='tarjeta')  # Quita 'tarjetas' de aquí

urlpatterns = router.urls  # Usa directamente router.urls sin path adicional