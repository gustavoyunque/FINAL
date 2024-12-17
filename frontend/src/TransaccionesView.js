import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransaccionesView = () => {
  const [transacciones, setTransacciones] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransacciones = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await axios.get('/api/transacciones/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setTransacciones(response.data);
        setError('');
      } catch (error) {
        console.error('Error al obtener las transacciones:', error);
        setError('No se pudieron cargar las transacciones');
      }
    };
    fetchTransacciones();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Mis Transacciones</h2>
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : transacciones.length > 0 ? (
        <div className="space-y-4">
          {transacciones.map((transaccion) => (
            <div key={transaccion.id} className="bg-gray-100 rounded-md p-4">
              <h3 className="text-lg font-medium">{transaccion.tipo}</h3>
              <p className="text-gray-600">Monto: {transaccion.monto.toFixed(2)} USD</p>
              <p className="text-gray-600">Estado: {transaccion.estado}</p>
              <p className="text-gray-600">Fecha: {new Date(transaccion.fecha_transaccion).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Cargando transacciones...</p>
      )}
    </div>
  );
};

export default TransaccionesView;