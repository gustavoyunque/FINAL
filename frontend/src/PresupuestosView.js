import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Configuración base de axios
axios.defaults.baseURL = 'http://127.0.0.1:8000';

const PresupuestosView = () => {
  const [presupuestos, setPresupuestos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre: '',
    tipo: 'GASTO',
    icono: '',
    color: '#000000'
  });
  const [nuevoPresupuesto, setNuevoPresupuesto] = useState({
    nombre: '',
    fecha_inicio: '',
    fecha_fin: '',
    monto_total: '',
    descripcion: ''
  });
  const [nuevaAsignacion, setNuevaAsignacion] = useState({
    categoria: '',
    monto_asignado: '',
    alerta_porcentaje: 80
  });
  const [presupuestoSeleccionado, setPresupuestoSeleccionado] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [mostrarFormCategoria, setMostrarFormCategoria] = useState(false);
  const [mostrarFormPresupuesto, setMostrarFormPresupuesto] = useState(false);

  useEffect(() => {
    fetchPresupuestos();
    fetchCategorias();
  }, []);

  const fetchPresupuestos = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const response = await axios.get('/api/presupuestos/', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setPresupuestos(response.data);
    } catch (err) {
      console.error('Error al cargar presupuestos:', err);
      setError('Error al cargar los presupuestos');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategorias = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('/api/presupuestos/categorias/', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setCategorias(response.data);
    } catch (err) {
      console.error('Error al cargar categorías:', err);
    }
  };

  const crearCategoria = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      await axios.post('/api/presupuestos/categorias/', nuevaCategoria, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setSuccess('Categoría creada exitosamente');
      setNuevaCategoria({ nombre: '', tipo: 'GASTO', icono: '', color: '#000000' });
      fetchCategorias();
      setMostrarFormCategoria(false);
    } catch (err) {
      setError('Error al crear la categoría');
    } finally {
      setLoading(false);
    }
  };

  const crearPresupuesto = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const response = await axios.post('/api/presupuestos/', nuevoPresupuesto, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setSuccess('Presupuesto creado exitosamente');
      setNuevoPresupuesto({
        nombre: '',
        fecha_inicio: '',
        fecha_fin: '',
        monto_total: '',
        descripcion: ''
      });
      fetchPresupuestos();
      setMostrarFormPresupuesto(false);
      setPresupuestoSeleccionado(response.data.id);
    } catch (err) {
      setError('Error al crear el presupuesto');
    } finally {
      setLoading(false);
    }
  };

  const asignarCategoria = async (e) => {
    e.preventDefault();
    if (!presupuestoSeleccionado) {
      setError('Selecciona un presupuesto primero');
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      await axios.post(`/api/presupuestos/${presupuestoSeleccionado}/asignar_categoria/`, 
        nuevaAsignacion,
        {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setSuccess('Categoría asignada exitosamente');
      setNuevaAsignacion({
        categoria: '',
        monto_asignado: '',
        alerta_porcentaje: 80
      });
      fetchPresupuestos();
    } catch (err) {
      setError('Error al asignar la categoría');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Gestión de Presupuestos</h1>

      {/* Botones de acción principales */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setMostrarFormCategoria(!mostrarFormCategoria)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          {mostrarFormCategoria ? 'Cancelar' : 'Nueva Categoría'}
        </button>
        <button
          onClick={() => setMostrarFormPresupuesto(!mostrarFormPresupuesto)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          {mostrarFormPresupuesto ? 'Cancelar' : 'Nuevo Presupuesto'}
        </button>
      </div>

      {/* Formulario de Nueva Categoría */}
      {mostrarFormCategoria && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Nueva Categoría</h2>
          <form onSubmit={crearCategoria} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                value={nuevaCategoria.nombre}
                onChange={(e) => setNuevaCategoria({...nuevaCategoria, nombre: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo</label>
              <select
                value={nuevaCategoria.tipo}
                onChange={(e) => setNuevaCategoria({...nuevaCategoria, tipo: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="GASTO">Gasto</option>
                <option value="INGRESO">Ingreso</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Color</label>
              <input
                type="color"
                value={nuevaCategoria.color}
                onChange={(e) => setNuevaCategoria({...nuevaCategoria, color: e.target.value})}
                className="mt-1 block w-full"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? 'Creando...' : 'Crear Categoría'}
            </button>
          </form>
        </div>
      )}

      {/* Formulario de Nuevo Presupuesto */}
      {mostrarFormPresupuesto && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Nuevo Presupuesto</h2>
          <form onSubmit={crearPresupuesto} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                value={nuevoPresupuesto.nombre}
                onChange={(e) => setNuevoPresupuesto({...nuevoPresupuesto, nombre: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha Inicio</label>
                <input
                  type="date"
                  value={nuevoPresupuesto.fecha_inicio}
                  onChange={(e) => setNuevoPresupuesto({...nuevoPresupuesto, fecha_inicio: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha Fin</label>
                <input
                  type="date"
                  value={nuevoPresupuesto.fecha_fin}
                  onChange={(e) => setNuevoPresupuesto({...nuevoPresupuesto, fecha_fin: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Monto Total</label>
              <input
                type="number"
                value={nuevoPresupuesto.monto_total}
                onChange={(e) => setNuevoPresupuesto({...nuevoPresupuesto, monto_total: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Descripción</label>
              <textarea
                value={nuevoPresupuesto.descripcion}
                onChange={(e) => setNuevoPresupuesto({...nuevoPresupuesto, descripcion: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows="3"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Creando...' : 'Crear Presupuesto'}
            </button>
          </form>
        </div>
      )}

      {/* Lista de Presupuestos */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Presupuestos Activos</h2>
        {presupuestos.length > 0 ? (
          <div className="space-y-4">
            {presupuestos.map((presupuesto) => (
              <div
                key={presupuesto.id}
                className={`border p-4 rounded-lg ${
                  presupuestoSeleccionado === presupuesto.id ? 'border-blue-500' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{presupuesto.nombre}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(presupuesto.fecha_inicio).toLocaleDateString()} - 
                      {new Date(presupuesto.fecha_fin).toLocaleDateString()}
                    </p>
                    <p className="text-sm">
                      Monto Total: ${presupuesto.monto_total.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => setPresupuestoSeleccionado(presupuesto.id)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      presupuestoSeleccionado === presupuesto.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {presupuestoSeleccionado === presupuesto.id ? 'Seleccionado' : 'Seleccionar'}
                  </button>
                </div>

                {/* Categorías del presupuesto */}
                {presupuesto.categorias && presupuesto.categorias.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium text-sm mb-2">Categorías:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {presupuesto.categorias.map((cat) => (
                        <div
                          key={cat.id}
                          className="bg-gray-50 p-3 rounded-md"
                        >
                          <div className="flex justify-between items-center">
                            <span style={{ color: cat.categoria_color }}>
                              {cat.categoria_nombre}
                            </span>
                            <span className="text-sm">
                              ${cat.monto_asignado.toLocaleString()}
                            </span>
                          </div>
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className={`h-2.5 rounded-full ${
                                  cat.porcentaje_utilizado > cat.alerta_porcentaje
                                    ? 'bg-red-500'
                                    : 'bg-green-500'
                                }`}
                                style={{ width: `${cat.porcentaje_utilizado}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs mt-1">
                              <span>Usado: ${cat.monto_utilizado.toLocaleString()}</span>
                              <span>{cat.porcentaje_utilizado.toFixed(1)}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Formulario para añadir categoría al presupuesto seleccionado */}
                {presupuestoSeleccionado === presupuesto.id && (
                  <div className="mt-4 border-t pt-4">
                    <h4 className="font-medium text-sm mb-2">Asignar Nueva Categoría</h4>
                    <form onSubmit={asignarCategoria} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <select
                          value={nuevaAsignacion.categoria}
                          onChange={(e) => setNuevaAsignacion({...nuevaAsignacion, categoria: e.target.value})}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required
                        >
                          <option value="">Seleccionar Categoría</option>
                          {categorias.map(cat => (
                            <option key={cat.id} value={cat.id}>
                              {cat.nombre} ({cat.tipo})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <input
                          type="number"
                          placeholder="Monto a asignar"
                          value={nuevaAsignacion.monto_asignado}
                          onChange={(e) => setNuevaAsignacion({...nuevaAsignacion, monto_asignado: e.target.value})}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:opacity-50"
                      >
                        Asignar
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No hay presupuestos activos</p>
        )}
      </div>

      {/* Mensajes de error y éxito */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-50 border-l-4 border-red-400 p-4 z-50">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      {success && (
        <div className="fixed bottom-4 right-4 bg-green-50 border-l-4 border-green-400 p-4 z-50">
          <p className="text-green-700">{success}</p>
        </div>
      )}
    </div>
  );
};

export default PresupuestosView;