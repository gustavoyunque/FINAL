import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotificacionesView = () => {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await axios.get('/api/notificaciones/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setNotificaciones(response.data);
      } catch (error) {
        console.error('Error al obtener las notificaciones:', error);
      }
    };
    fetchNotificaciones();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Notificaciones</h2>
      {notificaciones.length > 0 ? (
        <div className="space-y-4">
          {notificaciones.map((notificacion) => (
            <div key={notificacion.id} className="bg-gray-100 rounded-md p-4">
              <h3 className="text-lg font-medium">{notificacion.titulo}</h3>
              <p className="text-gray-600">{notificacion.mensaje}</p>
              <p className="text-gray-600">Fecha: {new Date(notificacion.fecha).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No tienes notificaciones por el momento.</p>
      )}
    </div>
  );
};

export default NotificacionesView;