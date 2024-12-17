import React, { useState } from 'react';
import axios from 'axios';

const TransferenciaView = () => {
  const [cuentaOrigen, setCuentaOrigen] = useState('');
  const [cuentaDestino, setCuentaDestino] = useState('');
  const [monto, setMonto] = useState(0);
  const [error, setError] = useState('');

  const handleTransferencia = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      await axios.post('/api/transacciones/', {
        cuenta_origen: cuentaOrigen,
        cuenta_destino: cuentaDestino,
        monto,
        tipo: 'transferencia',
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      // Limpiar los campos después de una transferencia exitosa
      setCuentaOrigen('');
      setCuentaDestino('');
      setMonto(0);
      setError('');
    } catch (err) {
      setError(`Error al realizar la transferencia: ${err.response.data.error}`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Realizar Transferencia</h2>
      <div className="mb-4">
        <label htmlFor="cuenta_origen" className="block text-gray-700 font-medium mb-2">
          Cuenta de Origen
        </label>
        <input
          type="text"
          id="cuenta_origen"
          value={cuentaOrigen}
          onChange={(e) => setCuentaOrigen(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="cuenta_destino" className="block text-gray-700 font-medium mb-2">
          Cuenta de Destino
        </label>
        <input
          type="text"
          id="cuenta_destino"
          value={cuentaDestino}
          onChange={(e) => setCuentaDestino(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="monto" className="block text-gray-700 font-medium mb-2">
          Monto
        </label>
        <input
          type="number"
          id="monto"
          value={monto}
          onChange={(e) => setMonto(parseFloat(e.target.value))}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <button
        onClick={handleTransferencia}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Realizar Transferencia
      </button>
    </div>
  );
};

export default TransferenciaView;