from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet

router = DefaultRouter()
router.register(r'', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', UserViewSet.as_view({'post': 'login'}), name='user-login'),
    path('<int:pk>/cambiar-tipo/', UserViewSet.as_view({'put': 'cambiar_tipo_usuario'}), name='cambiar-tipo-usuario')
    path('me/', views.PerfilView.as_view(), name='perfil'),
]