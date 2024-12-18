import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Configuración base de axios
axios.defaults.baseURL = 'http://127.0.0.1:8000';

const AlertasView = () => {
  const [alerta, setAlerta] = useState({
    saldo_minimo: '',
    notificar_transacciones: false,
  });
  const [alertaExistente, setAlertaExistente] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Cargar alerta existente al montar el componente
  useEffect(() => {
    fetchAlerta();
  }, []);

  const fetchAlerta = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const response = await axios.get('/api/alertas/', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.data.length > 0) {
        setAlertaExistente(response.data[0]);
        setAlerta(response.data[0]);
      }
    } catch (err) {
      console.error('Error al cargar alertas:', err);
      setError('Error al cargar las alertas existentes');
    } finally {
      setLoading(false);
    }
  };

  const guardarAlerta = async () => {
    try {
      setLoading(true);
      // Validación básica
      if (alerta.saldo_minimo === '' || alerta.saldo_minimo < 0) {
        setError('Por favor ingrese un saldo mínimo válido');
        return;
      }

      const token = localStorage.getItem('access_token');
      const endpoint = alertaExistente ? `/api/alertas/${alertaExistente.id}/` : '/api/alertas/';
      const method = alertaExistente ? 'put' : 'post';

      const response = await axios[method](
        endpoint,
        alerta,
        {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setSuccess('Alerta guardada correctamente');
      setError('');
      if (!alertaExistente) {
        setAlertaExistente(response.data);
      }
      
      // Recargar los datos
      fetchAlerta();
    } catch (err) {
      console.error('Error completo:', err);
      setError('Error al guardar las alertas: ' + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Configurar Alertas</h2>
      
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Saldo Mínimo
          </label>
          <input
            type="number"
            value={alerta.saldo_minimo}
            onChange={(e) => setAlerta({ ...alerta, saldo_minimo: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            min="0"
            step="0.01"
            placeholder="Ingrese el saldo mínimo"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={alerta.notificar_transacciones}
            onChange={(e) => setAlerta({ ...alerta, notificar_transacciones: e.target.checked })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            id="notificar"
          />
          <label htmlFor="notificar" className="text-sm font-medium text-gray-700">
            Notificar Transacciones Sospechosas
          </label>
        </div>

        <button
          onClick={guardarAlerta}
          disabled={loading}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Guardando...' : 'Guardar Alertas'}
        </button>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4">
            <p className="text-green-700">{success}</p>
          </div>
        )}

        {alertaExistente && (
          <div className="mt-4 text-sm text-gray-500">
            <p>Última actualización: {new Date(alertaExistente.fecha_actualizacion).toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertasView;