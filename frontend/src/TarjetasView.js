import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TarjetasView = () => {
  const [tarjetas, setTarjetas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTarjetas = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await axios.get('/api/tarjetas/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setTarjetas(response.data);
        setError('');
      } catch (error) {
        console.error('Error al obtener las tarjetas:', error);
        setError('No se pudieron cargar las tarjetas');
      }
    };
    fetchTarjetas();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Mis Tarjetas</h2>
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : tarjetas.length > 0 ? (
        <div className="space-y-4">
          {tarjetas.map((tarjeta) => (
            <div key={tarjeta.id} className="bg-gray-100 rounded-md p-4">
              <h3 className="text-lg font-medium">{tarjeta.tipo_tarjeta.toUpperCase()} - {tarjeta.numero_tarjeta}</h3>
              <p className="text-gray-600">Estado: {tarjeta.estado}</p>
              <p className="text-gray-600">Fecha de Emisión: {new Date(tarjeta.fecha_emision).toLocaleDateString()}</p>
              <p className="text-gray-600">Fecha de Vencimiento: {new Date(tarjeta.fecha_vencimiento).toLocaleDateString()}</p>
              <p className="text-gray-600">Límite de Crédito: {tarjeta.limite_credito?.toFixed(2) || 'N/A'} USD</p>
              <p className="text-gray-600">Saldo Disponible: {tarjeta.saldo_disponible.toFixed(2)} USD</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Cargando tarjetas...</p>
      )}
    </div>
  );
};

export default TarjetasView;