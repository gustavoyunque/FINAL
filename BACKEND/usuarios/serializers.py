from rest_framework import serializers
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'tipo_usuario',
            'documento_identidad',
            'telefono',
            'direccion',
            'fecha_nacimiento'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True}
        }

    def create(self, validated_data):
        """
        Método para crear un nuevo usuario
        """
        usuario = Usuario.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data.get('password'),
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            tipo_usuario=validated_data.get('tipo_usuario', 'cliente')
        )
        return usuario

    def update(self, instance, validated_data):
        """
        Método para actualizar un usuario
        """
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.tipo_usuario = validated_data.get('tipo_usuario', instance.tipo_usuario)

        if 'password' in validated_data:
            instance.set_password(validated_data['password'])

        instance.save()
        return instance