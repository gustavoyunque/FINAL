import React, { useState } from 'react';
import axios from 'axios';

const AlertasView = () => {
  const [saldoMinimo, setSaldoMinimo] = useState(500);
  const [transaccionesSospechosas, setTransaccionesSospechosas] = useState(true);
  const [error, setError] = useState('');

  const handleGuardarAlertas = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      await axios.put('/api/usuarios/alertas/', {
        saldo_minimo: saldoMinimo,
        transacciones_sospechosas: transaccionesSospechosas
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setError('');
    } catch (err) {
      setError(`Error al guardar las alertas: ${err.response.data.error}`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Configurar Alertas</h2>
      <div className="mb-4">
        <label htmlFor="saldo_minimo" className="block text-gray-700 font-medium mb-2">
          Saldo Mínimo
        </label>
        <input
          type="number"
          id="saldo_minimo"
          value={saldoMinimo}
          onChange={(e) => setSaldoMinimo(parseFloat(e.target.value))}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="transacciones_sospechosas" className="block text-gray-700 font-medium mb-2">
          Notificar Transacciones Sospechosas
        </label>
        <input
          type="checkbox"
          id="transacciones_sospechosas"
          checked={transaccionesSospechosas}
          onChange={(e) => setTransaccionesSospechosas(e.target.checked)}
          className="mr-2"
        />
        <span>Activar</span>
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <button
        onClick={handleGuardarAlertas}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Guardar Alertas
      </button>
    </div>
  );
};

export default AlertasView;