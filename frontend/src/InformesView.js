import React, { useState } from 'react';
import axios from 'axios';
import { format, subMonths } from 'date-fns';

const InformesView = () => {
  const [fechaInicio, setFechaInicio] = useState(subMonths(new Date(), 3));
  const [fechaFin, setFechaFin] = useState(new Date());
  const [informeGeneral, setInformeGeneral] = useState(null);
  const [error, setError] = useState('');

  const handleGenerarInforme = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await axios.get('/api/informes/', {
        params: {
          fecha_inicio: format(fechaInicio, 'yyyy-MM-dd'),
          fecha_fin: format(fechaFin, 'yyyy-MM-dd')
        },
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setInformeGeneral(response.data);
      setError('');
    } catch (err) {
      setError(`Error al generar el informe: ${err.response.data.error}`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Generar Informe</h2>
      <div className="mb-4">
        <label htmlFor="fecha_inicio" className="block text-gray-700 font-medium mb-2">
          Fecha de Inicio
        </label>
        <input
          type="date"
          id="fecha_inicio"
          value={format(fechaInicio, 'yyyy-MM-dd')}
          onChange={(e) => setFechaInicio(new Date(e.target.value))}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="fecha_fin" className="block text-gray-700 font-medium mb-2">
          Fecha de Fin
        </label>
        <input
          type="date"
          id="fecha_fin"
          value={format(fechaFin, 'yyyy-MM-dd')}
          onChange={(e) => setFechaFin(new Date(e.target.value))}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <button
        onClick={handleGenerarInforme}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Generar Informe
      </button>

      {informeGeneral && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Resumen del Informe</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium">Ingresos Totales</h4>
              <p className="text-gray-600">{informeGeneral.ingresos_totales.toFixed(2)} USD</p>
            </div>
            <div>
              <h4 className="text-lg font-medium">Gastos Totales</h4>
              <p className="text-gray-600">{informeGeneral.gastos_totales.toFixed(2)} USD</p>
            </div>
            <div>
              <h4 className="text-lg font-medium">Saldo Neto</h4>
              <p className="text-gray-600">{informeGeneral.saldo_neto.toFixed(2)} USD</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InformesView;