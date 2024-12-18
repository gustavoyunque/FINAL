from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoriaViewSet, PresupuestoViewSet

router = DefaultRouter()
router.register('categorias', CategoriaViewSet)
router.register('', PresupuestoViewSet, basename='presupuesto')  # Cambiado a ruta vacía

urlpatterns = router.urls