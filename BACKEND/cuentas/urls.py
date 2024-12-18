from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AccountViewSet

# Configuración del router
router = DefaultRouter()
router.register(r'', AccountViewSet)  # Sin duplicar 'cuentas'

# URL patterns
urlpatterns = [
    path('', include(router.urls)),  # Accesible como /api/cuentas/
]
