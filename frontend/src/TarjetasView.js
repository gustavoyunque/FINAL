import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Mover la configuración de axios fuera del componente
axios.defaults.baseURL = 'http://127.0.0.1:8000';

const TarjetasView = () => {
  const [tarjetas, setTarjetas] = useState([]);
  const [nuevaTarjeta, setNuevaTarjeta] = useState({
    numero: '',
    titular: '',
    fecha_vencimiento: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTarjetas();
  }, []);

  const fetchTarjetas = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('/api/tarjetas/', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      setTarjetas(response.data);
    } catch (err) {
      console.error('Error completo:', err);
      setError('Error al cargar las tarjetas.');
    }
  };

  const crearTarjeta = async () => {
    try {
      // Validación básica
      if (!nuevaTarjeta.numero || !nuevaTarjeta.titular || !nuevaTarjeta.fecha_vencimiento) {
        setError('Todos los campos son obligatorios');
        return;
      }

      const token = localStorage.getItem('access_token');
      const response = await axios.post('/api/tarjetas/', nuevaTarjeta, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      console.log('Respuesta exitosa:', response.data);
      setNuevaTarjeta({ numero: '', titular: '', fecha_vencimiento: '' });
      fetchTarjetas();
      setError('');
    } catch (err) {
      console.error('Error completo:', err);
      setError(err.response?.data?.detail || 'Error al crear la tarjeta. Verifica los campos.');
    }
  };

  const eliminarTarjeta = async (id) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`/api/tarjetas/${id}/`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      fetchTarjetas();
    } catch (err) {
      console.error('Error completo:', err);
      setError('Error al eliminar la tarjeta.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Tarjetas</h1>
      
      {/* Nueva Tarjeta */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Nueva Tarjeta</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Número de tarjeta"
            value={nuevaTarjeta.numero}
            onChange={(e) =>
              setNuevaTarjeta({ ...nuevaTarjeta, numero: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Titular"
            value={nuevaTarjeta.titular}
            onChange={(e) =>
              setNuevaTarjeta({ ...nuevaTarjeta, titular: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            placeholder="Fecha de vencimiento"
            value={nuevaTarjeta.fecha_vencimiento}
            onChange={(e) =>
              setNuevaTarjeta({ ...nuevaTarjeta, fecha_vencimiento: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <button
            onClick={crearTarjeta}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Crear Tarjeta
          </button>
        </div>
      </div>

      {/* Lista de Tarjetas */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Lista de Tarjetas</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {tarjetas.length > 0 ? (
          <div className="space-y-4">
            {tarjetas.map((tarjeta) => (
              <div
                key={tarjeta.id}
                className="border p-4 rounded shadow"
              >
                <p>Número: **** **** **** {tarjeta.numero.slice(-4)}</p>
                <p>Titular: {tarjeta.titular}</p>
                <p>Fecha de Vencimiento: {tarjeta.fecha_vencimiento}</p>
                <p>Estado: {tarjeta.estado}</p>
                <button
                  onClick={() => eliminarTarjeta(tarjeta.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-2 hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No tienes tarjetas registradas.</p>
        )}
      </div>
    </div>
  );
};

export default TarjetasView;