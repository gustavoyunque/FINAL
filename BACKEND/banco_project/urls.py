from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from usuarios.views import UserViewSet
from cuentas.views import AccountViewSet 
from transacciones.views import TransactionViewSet
from prestamos.views import LoanViewSet
from tarjetas.views import CardViewSet
from dashboard.views import DashboardView
from informes.views import InformesView
from notificaciones.views import NotificacionesView

router = DefaultRouter()
router.register(r'usuarios', UserViewSet)
router.register(r'cuentas', AccountViewSet)
router.register(r'transacciones', TransactionViewSet)
router.register(r'prestamos', LoanViewSet)
router.register(r'tarjetas', CardViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include([
        path('usuarios/', include('usuarios.urls')),
        path('cuentas/', include('cuentas.urls')),
        path('transacciones/', include('transacciones.urls')),
        path('prestamos/', include('prestamos.urls')),
        path('tarjetas/', include('tarjetas.urls')),
        path('dashboard/', include('dashboard.urls')),
        path('informes/', include('informes.urls')),
        path('notificaciones/', include('notificaciones.urls')),
        path('presupuestos/', include('presupuestos.urls')),
        path('personalizacion/', include('personalizacion.urls')),
        path('transferencia/', include('transferencia.urls')),
        path('soporte/', include('soporte.urls')),
        path('recordatorios/', include('recordatorios.urls')),
    ])),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('', lambda request: redirect('/api/dashboard/', permanent=False), name='root'),
]