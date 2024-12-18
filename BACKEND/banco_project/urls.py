from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),

    # Rutas JWT para autenticación
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Rutas principales de la API
    path('api/usuarios/', include('usuarios.urls')),
    path('api/cuentas/', include('cuentas.urls')),
    path('api/transacciones/', include('transacciones.urls')),
    path('api/prestamos/', include('prestamos.urls')),
    path('api/tarjetas/', include('tarjetas.urls')),
    path('api/dashboard/', include('dashboard.urls')),
    path('api/informes/', include('informes.urls')),
    path('api/notificaciones/', include('notificaciones.urls')),
    path('api/presupuestos/', include('presupuestos.urls')),
    path('api/personalizacion/', include('personalizacion.urls')),
    path('api/transferencia/', include('transferencia.urls')),
    path('api/soporte/', include('soporte.urls')),
    path('api/recordatorios/', include('recordatorios.urls')),

    # Autenticación con DRF
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    # Redirección por defecto
    path('', lambda request: redirect('/api/dashboard/', permanent=False), name='root'),
]
