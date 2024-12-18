from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, 
    PerfilView, 
    VerifyTokenView,
    UserProfileView
)

# Configuración del router para UserViewSet
router = DefaultRouter()
router.register(r'gestion', UserViewSet)  # Cambié a 'gestion' para las operaciones CRUD de usuarios

urlpatterns = [
    # Incluye las rutas generadas automáticamente
    path('', include(router.urls)),  

    # Rutas personalizadas
    path('login/', UserViewSet.as_view({'post': 'login'}), name='user-login'),
    path('me/', UserProfileView.as_view(), name='user-profile'),  # Ruta corregida
    path('verify-token/', VerifyTokenView.as_view(), name='verify-token'),
    path('perfil/', PerfilView.as_view(), name='perfil'),
    path('<int:pk>/cambiar-tipo/', 
         UserViewSet.as_view({'put': 'cambiar_tipo_usuario'}), 
         name='cambiar-tipo-usuario'),
]
