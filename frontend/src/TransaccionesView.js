import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransaccionesView = () => {
  const [transacciones, setTransacciones] = useState([]);
  const [nuevaTransaccion, setNuevaTransaccion] = useState({
    cuenta_origen: '',
    cuenta_destino: '',
    tipo: 'deposito',
    monto: '',
    descripcion: '',
  });
  const [error, setError] = useState('');
  const [resumen, setResumen] = useState({
    total_depositos: 0,
    total_retiros: 0,
    total_transferencias: 0,
    balance: 0,
  });
  const [filtros, setFiltros] = useState({
    tipo: '',
    cuenta_origen: '',
    cuenta_destino: '',
    fecha_inicio: '',
    fecha_fin: '',
  });

  useEffect(() => {
    fetchTransacciones();
    fetchResumen();
  }, []);

  const fetchTransacciones = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('/api/transacciones/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransacciones(response.data);
      setError('');
    } catch (error) {
      setError('No se pudieron cargar las transacciones.');
    }
  };

  const fetchResumen = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('/api/transacciones/resumen/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResumen(response.data);
    } catch (error) {
      console.error('Error al cargar el resumen:', error.response?.data);
    }
  };

  const filtrarTransacciones = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const params = new URLSearchParams(filtros);
      const response = await axios.get(`/api/transacciones/?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransacciones(response.data);
      setError('');
    } catch (error) {
      setError('Error al filtrar las transacciones.');
    }
  };

  const crearTransaccion = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const data = {
        cuenta_origen: nuevaTransaccion.cuenta_origen,
        cuenta_destino: nuevaTransaccion.cuenta_destino || null,
        tipo: nuevaTransaccion.tipo,
        monto: parseFloat(nuevaTransaccion.monto),
        descripcion: nuevaTransaccion.descripcion,
      };
      await axios.post('/api/transacciones/', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      fetchTransacciones();
      fetchResumen();
      setNuevaTransaccion({
        cuenta_origen: '',
        cuenta_destino: '',
        tipo: 'deposito',
        monto: '',
        descripcion: '',
      });
      setError('');
    } catch (error) {
      console.error('Error al crear la transacción:', error.response?.data);
      setError('Error al crear la transacción. Verifica los campos.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Mis Transacciones</h2>

      {/* Filtros */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Filtrar Transacciones</h3>
        <select
          value={filtros.tipo}
          onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
          className="border p-2 mr-2"
        >
          <option value="">Tipo</option>
          <option value="deposito">Depósito</option>
          <option value="retiro">Retiro</option>
          <option value="transferencia">Transferencia</option>
        </select>
        <input
          type="text"
          placeholder="Cuenta Origen"
          value={filtros.cuenta_origen}
          onChange={(e) => setFiltros({ ...filtros, cuenta_origen: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Cuenta Destino"
          value={filtros.cuenta_destino}
          onChange={(e) => setFiltros({ ...filtros, cuenta_destino: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="date"
          value={filtros.fecha_inicio}
          onChange={(e) => setFiltros({ ...filtros, fecha_inicio: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="date"
          value={filtros.fecha_fin}
          onChange={(e) => setFiltros({ ...filtros, fecha_fin: e.target.value })}
          className="border p-2 mr-2"
        />
        <button
          onClick={filtrarTransacciones}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
      </div>

      {/* Crear nueva transacción */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Nueva Transacción</h3>
        <input
          type="text"
          placeholder="Cuenta Origen"
          value={nuevaTransaccion.cuenta_origen}
          onChange={(e) =>
            setNuevaTransaccion({ ...nuevaTransaccion, cuenta_origen: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Cuenta Destino (opcional)"
          value={nuevaTransaccion.cuenta_destino}
          onChange={(e) =>
            setNuevaTransaccion({ ...nuevaTransaccion, cuenta_destino: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <select
          value={nuevaTransaccion.tipo}
          onChange={(e) =>
            setNuevaTransaccion({ ...nuevaTransaccion, tipo: e.target.value })
          }
          className="border p-2 mr-2"
        >
          <option value="deposito">Depósito</option>
          <option value="retiro">Retiro</option>
          <option value="transferencia">Transferencia</option>
        </select>
        <input
          type="number"
          placeholder="Monto"
          value={nuevaTransaccion.monto}
          onChange={(e) =>
            setNuevaTransaccion({ ...nuevaTransaccion, monto: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Descripción"
          value={nuevaTransaccion.descripcion}
          onChange={(e) =>
            setNuevaTransaccion({ ...nuevaTransaccion, descripcion: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <button
          onClick={crearTransaccion}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Crear Transacción
        </button>
      </div>

      {/* Listar transacciones */}
      {error && <p className="text-red-500">{error}</p>}
      <div>
        {transacciones.map((t) => (
          <div key={t.id} className="bg-gray-100 p-4 rounded mb-2">
            <p><strong>Tipo:</strong> {t.tipo}</p>
            <p><strong>Monto:</strong> {t.monto}</p>
            <p><strong>Fecha:</strong> {new Date(t.fecha).toLocaleString()}</p>
            <p><strong>Descripción:</strong> {t.descripcion}</p>
          </div>
        ))}
      </div>

      {/* Resumen de Transacciones */}
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-2">Resumen de Transacciones</h3>
        <div className="bg-blue-50 p-4 rounded mb-4">
          <p><strong>Total Depósitos:</strong> {resumen.total_depositos}</p>
          <p><strong>Total Retiros:</strong> {resumen.total_retiros}</p>
          <p><strong>Total Transferencias:</strong> {resumen.total_transferencias}</p>
          <p><strong>Balance General:</strong> {resumen.balance}</p>
        </div>
      </div>
    </div>
  );
};

export default TransaccionesView;
