# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InformeViewSet

router = DefaultRouter()
router.register('', InformeViewSet, basename='informe')

urlpatterns = router.urls