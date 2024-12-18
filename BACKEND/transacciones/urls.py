from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TransaccionViewSet

# Instancia el router para registrar las vistas
router = DefaultRouter()

# Registra el ViewSet de transacciones (la ruta base será /api/transacciones/)
router.register(r'', TransaccionViewSet, basename='transacciones')

# Incluye las rutas generadas por el router
urlpatterns = [
    path('', include(router.urls)),
]
