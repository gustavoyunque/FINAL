import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CuentasView = () => {
  const [cuentas, setCuentas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCuentas = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await axios.get('/api/cuentas/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setCuentas(response.data);
        setError('');
      } catch (error) {
        console.error('Error al obtener las cuentas:', error);
        setError('No se pudieron cargar las cuentas');
      }
    };
    fetchCuentas();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Mis Cuentas</h2>
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : cuentas.length > 0 ? (
        <div className="space-y-4">
          {cuentas.map((cuenta) => (
            <div key={cuenta.id} className="bg-gray-100 rounded-md p-4">
              <h3 className="text-lg font-medium">{cuenta.numero_cuenta}</h3>
              <p className="text-gray-600">Tipo: {cuenta.tipo_cuenta}</p>
              <p className="text-gray-600">Saldo: {cuenta.saldo.toFixed(2)} USD</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Cargando cuentas...</p>
      )}
    </div>
  );
};

export default CuentasView;