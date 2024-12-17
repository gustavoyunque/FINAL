from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Personalizacion
from .serializers import PersonalizacionSerializer

class PersonalizacionView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        usuario = request.user
        personalizacion, _ = Personalizacion.objects.get_or_create(usuario=usuario)
        serializer = PersonalizacionSerializer(personalizacion)
        return Response(serializer.data)

    def put(self, request):
        usuario = request.user
        personalizacion, _ = Personalizacion.objects.get_or_create(usuario=usuario)
        serializer = PersonalizacionSerializer(personalizacion, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'error': serializer.errors}, status=400)