import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PrestamosView = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPrestamos = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await axios.get('/api/prestamos/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setPrestamos(response.data);
        setError('');
      } catch (error) {
        console.error('Error al obtener los préstamos:', error);
        setError('No se pudieron cargar los préstamos');
      }
    };
    fetchPrestamos();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Mis Préstamos</h2>
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : prestamos.length > 0 ? (
        <div className="space-y-4">
          {prestamos.map((prestamo) => (
            <div key={prestamo.id} className="bg-gray-100 rounded-md p-4">
              <h3 className="text-lg font-medium">{prestamo.tipo_prestamo}</h3>
              <p className="text-gray-600">Monto Solicitado: {prestamo.monto_solicitado.toFixed(2)} USD</p>
              <p className="text-gray-600">Monto Aprobado: {prestamo.monto_aprobado?.toFixed(2) || 'N/A'} USD</p>
              <p className="text-gray-600">Estado: {prestamo.estado}</p>
              <p className="text-gray-600">Tasa de Interés: {prestamo.tasa_interes}%</p>
              <p className="text-gray-600">Plazo: {prestamo.plazo_meses} meses</p>
              <p className="text-gray-600">Fecha de Solicitud: {new Date(prestamo.fecha_solicitud).toLocaleString()}</p>
              {prestamo.fecha_aprobacion && (
                <p className="text-gray-600">Fecha de Aprobación: {new Date(prestamo.fecha_aprobacion).toLocaleString()}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Cargando préstamos...</p>
      )}
    </div>
  );
};

export default PrestamosView;