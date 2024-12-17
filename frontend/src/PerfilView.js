import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PerfilView = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await axios.get('/api/usuarios/me/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setUsuario(response.data);
      } catch (error) {
        console.error('Error al obtener el perfil de usuario:', error);
      }
    };
    fetchUsuario();
  }, []);

  if (!usuario) {
    return <p className="text-gray-600">Cargando perfil...</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
      <div className="space-y-2">
        <p><span className="font-medium">Nombre de usuario:</span> {usuario.username}</p>
        <p><span className="font-medium">Correo electrónico:</span> {usuario.email}</p>
        <p><span className="font-medium">Tipo de usuario:</span> {usuario.tipo_usuario}</p>
        <p><span className="font-medium">Documento de identidad:</span> {usuario.documento_identidad}</p>
        <p><span className="font-medium">Teléfono:</span> {usuario.telefono || 'N/A'}</p>
        <p><span className="font-medium">Dirección:</span> {usuario.direccion || 'N/A'}</p>
        <p><span className="font-medium">Fecha de nacimiento:</span> {usuario.fecha_nacimiento ? new Date(usuario.fecha_nacimiento).toLocaleDateString() : 'N/A'}</p>
      </div>
    </div>
  );
};

export default PerfilView;