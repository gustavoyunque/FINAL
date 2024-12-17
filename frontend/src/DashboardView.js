import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardView = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await axios.get('http://localhost:8000/api/dashboard/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        });
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error al obtener datos del dashboard:', error);
        setError(error.response?.data?.message || 'Error al cargar los datos');
      }
    };

    fetchDashboardData();
  }, []);

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!dashboardData) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h2>Dashboard Financiero</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-100 rounded-md p-4">
          <h3 className="text-lg font-medium mb-2">Balance Total</h3>
          <p className="text-3xl font-bold">{dashboardData.balance_total.toFixed(2)} USD</p>
        </div>
        <div className="bg-gray-100 rounded-md p-4">
          <h3 className="text-lg font-medium mb-2">Transacciones Recientes</h3>
          <ul className="space-y-2">
            {dashboardData.transacciones_recientes.map((transaccion) => (
              <li key={transaccion.id}>
                <p className="text-gray-600">{transaccion.tipo} - {transaccion.monto.toFixed(2)} USD</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-100 rounded-md p-4">
          <h3 className="text-lg font-medium mb-2">Préstamos Activos</h3>
          <ul className="space-y-2">
            {dashboardData.prestamos_activos.map((prestamo) => (
              <li key={prestamo.id}>
                <p className="text-gray-600">{prestamo.tipo_prestamo} - {prestamo.monto_aprobado.toFixed(2)} USD</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;