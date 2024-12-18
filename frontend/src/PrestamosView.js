import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PrestamosView = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [nuevoPrestamo, setNuevoPrestamo] = useState({
    monto: '',
    plazo: '',
    tasa_interes: '',
  });
  const [resumen, setResumen] = useState({ total_monto: 0, total_saldo_pendiente: 0 });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPrestamos();
    fetchResumen();
  }, []);

  const fetchPrestamos = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('/api/prestamos/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPrestamos(response.data);
      setError('');
    } catch (err) {
      setError('No se pudieron cargar los préstamos.');
    }
  };

  const fetchResumen = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('/api/prestamos/resumen/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResumen(response.data);
    } catch (err) {
      setError('Error al cargar el resumen de préstamos.');
    }
  };

  const crearPrestamo = async () => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.post(
        '/api/prestamos/',
        {
          monto: parseFloat(nuevoPrestamo.monto),
          plazo: parseInt(nuevoPrestamo.plazo),
          tasa_interes: parseFloat(nuevoPrestamo.tasa_interes),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPrestamos();
      fetchResumen();
      setNuevoPrestamo({ monto: '', plazo: '', tasa_interes: '' });
    } catch (err) {
      setError('Error al crear el préstamo. Verifica los campos.');
    }
  };

  const eliminarPrestamo = async (id) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`/api/prestamos/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPrestamos();
      fetchResumen();
    } catch (err) {
      setError('Error al eliminar el préstamo.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Gestión de Préstamos</h2>

      {/* Crear préstamo */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Nuevo Préstamo</h3>
        <div className="flex space-x-2 mb-4">
          <input
            type="number"
            placeholder="Monto"
            value={nuevoPrestamo.monto}
            onChange={(e) => setNuevoPrestamo({ ...nuevoPrestamo, monto: e.target.value })}
            className="border p-2 rounded flex-1"
          />
          <input
            type="number"
            placeholder="Plazo (meses)"
            value={nuevoPrestamo.plazo}
            onChange={(e) => setNuevoPrestamo({ ...nuevoPrestamo, plazo: e.target.value })}
            className="border p-2 rounded flex-1"
          />
          <input
            type="number"
            placeholder="Tasa de interés (%)"
            value={nuevoPrestamo.tasa_interes}
            onChange={(e) =>
              setNuevoPrestamo({ ...nuevoPrestamo, tasa_interes: e.target.value })
            }
            className="border p-2 rounded flex-1"
          />
        </div>
        <button
          onClick={crearPrestamo}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Crear Préstamo
        </button>
      </div>

      {/* Resumen de Préstamos */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Resumen</h3>
        <p><strong>Total Monto:</strong> {parseFloat(resumen.total_monto).toFixed(2)} USD</p>
        <p><strong>Total Saldo Pendiente:</strong> {parseFloat(resumen.total_saldo_pendiente).toFixed(2)} USD</p>
      </div>

      {/* Mostrar Errores */}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Lista de Préstamos */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Préstamos Registrados</h3>
        {prestamos.length > 0 ? (
          <div className="space-y-4">
            {prestamos.map((p) => (
              <div key={p.id} className="bg-gray-100 rounded-md p-4">
                <p><strong>Monto:</strong> {parseFloat(p.monto).toFixed(2)} USD</p>
                <p><strong>Plazo:</strong> {p.plazo} meses</p>
                <p><strong>Tasa de Interés:</strong> {parseFloat(p.tasa_interes).toFixed(2)}%</p>
                <p><strong>Saldo Pendiente:</strong> {parseFloat(p.saldo_pendiente).toFixed(2)} USD</p>
                <button
                  onClick={() => eliminarPrestamo(p.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No tienes préstamos registrados.</p>
        )}
      </div>
    </div>
  );
};

export default PrestamosView;
