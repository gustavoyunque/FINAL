import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Configura la URL base global para axios
axios.defaults.baseURL = 'http://127.0.0.1:8000';

const CuentasView = () => {
  const [cuentas, setCuentas] = useState([]);
  const [error, setError] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [nuevaCuenta, setNuevaCuenta] = useState({
    numero_cuenta: '',
    tipo_cuenta: '',
    saldo: '',
    limite_diario: '',
    moneda: 'USD',
    fecha_apertura: '',
  });

  // Obtener todas las cuentas
  const fetchCuentas = async (filtro = '') => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await axios.get(`/api/cuentas/${filtro}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setCuentas(response.data);
      setError('');
    } catch (error) {
      console.error('Error al obtener las cuentas:', error);
      setError('No se pudieron cargar las cuentas');
    }
  };

  // Cargar cuentas al inicio
  useEffect(() => {
    fetchCuentas();
  }, []);

  // Crear una nueva cuenta
  const crearCuenta = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await axios.post(
        '/api/cuentas/',
        {
          numero_cuenta: nuevaCuenta.numero_cuenta,
          tipo_cuenta: nuevaCuenta.tipo_cuenta,
          saldo: parseFloat(nuevaCuenta.saldo),
          limite_diario: parseFloat(nuevaCuenta.limite_diario),
          moneda: nuevaCuenta.moneda,
          fecha_apertura: nuevaCuenta.fecha_apertura,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Cuenta creada exitosamente:', response.data);
      fetchCuentas();
      setNuevaCuenta({
        numero_cuenta: '',
        tipo_cuenta: '',
        saldo: '',
        limite_diario: '',
        moneda: 'USD',
        fecha_apertura: '',
      });
      setError('');
    } catch (error) {
      console.error('Error al crear la cuenta:', error.response?.data);
      setError('No se pudo crear la cuenta. Verifica los campos e intenta de nuevo.');
    }
  };

  // Eliminar una cuenta (solo si está inactiva)
  const eliminarCuenta = async (id, estado) => {
    // Permite eliminar sin importar el estado
if (!estado) {
  console.warn('No se verificó el estado de la cuenta.');
}


    try {
      const accessToken = localStorage.getItem('access_token');
      await axios.delete(`/api/cuentas/${id}/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      alert('Cuenta eliminada correctamente.');
      fetchCuentas(); // Actualizar la lista
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error.response?.data);
      setError('No se pudo eliminar la cuenta. Intenta de nuevo.');
    }
  };

  // Filtrar cuentas activas/inactivas
  const filtrarCuentas = (estado) => {
    setFiltroEstado(estado);
    fetchCuentas(`?estado=${estado}`);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Mis Cuentas</h2>

      {/* Crear una nueva cuenta */}
      <div className="mb-6">
        <h3 className="text-lg font-bold">Crear Nueva Cuenta</h3>
        <input
          type="text"
          placeholder="Número de Cuenta"
          value={nuevaCuenta.numero_cuenta}
          onChange={(e) =>
            setNuevaCuenta({ ...nuevaCuenta, numero_cuenta: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Tipo de Cuenta (ahorro, corriente)"
          value={nuevaCuenta.tipo_cuenta}
          onChange={(e) =>
            setNuevaCuenta({ ...nuevaCuenta, tipo_cuenta: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Saldo Inicial"
          value={nuevaCuenta.saldo}
          onChange={(e) =>
            setNuevaCuenta({ ...nuevaCuenta, saldo: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Límite Diario"
          value={nuevaCuenta.limite_diario}
          onChange={(e) =>
            setNuevaCuenta({ ...nuevaCuenta, limite_diario: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <select
          value={nuevaCuenta.moneda}
          onChange={(e) =>
            setNuevaCuenta({ ...nuevaCuenta, moneda: e.target.value })
          }
          className="border p-2 mr-2"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="PEN">PEN</option>
        </select>
        <input
          type="date"
          value={nuevaCuenta.fecha_apertura}
          onChange={(e) =>
            setNuevaCuenta({ ...nuevaCuenta, fecha_apertura: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <button
          onClick={crearCuenta}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Crear Cuenta
        </button>
      </div>

      {/* Filtrar cuentas */}
      <div className="mb-6">
        <h3 className="text-lg font-bold">Filtrar Cuentas</h3>
        <button
          onClick={() => filtrarCuentas('activa')}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          Activas
        </button>
        <button
          onClick={() => filtrarCuentas('inactiva')}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Inactivas
        </button>
        <button
          onClick={() => fetchCuentas()}
          className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
        >
          Mostrar Todas
        </button>
      </div>

      {/* Listado de cuentas */}
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : cuentas.length > 0 ? (
        <div className="space-y-4">
          {cuentas.map((cuenta) => (
            <div key={cuenta.id} className="bg-gray-100 rounded-md p-4">
              <h3 className="text-lg font-medium">{cuenta.numero_cuenta}</h3>
              <p className="text-gray-600">Tipo: {cuenta.tipo_cuenta}</p>
              <p className="text-gray-600">
                Saldo: {Number(cuenta.saldo).toFixed(2)} {cuenta.moneda}
              </p>
              <p className="text-gray-600">Estado: {cuenta.estado}</p>
              <p className="text-gray-600">Fecha Apertura: {cuenta.fecha_apertura}</p>
              <button
                 onClick={() => eliminarCuenta(cuenta.id)}
                 className="bg-red-500 text-white px-3 py-1 rounded"
>
                 Eliminar
               </button>

            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No hay cuentas disponibles.</p>
      )}
    </div>
  );
};

export default CuentasView;
