import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Configuración base de axios
axios.defaults.baseURL = 'http://127.0.0.1:8000';

const InformesView = () => {
  const [informes, setInformes] = useState([]);
  const [nuevoInforme, setNuevoInforme] = useState({
    tipo: 'GENERAL',
    formato: 'PDF',
    fecha_inicio: '',
    fecha_fin: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInformes();
  }, []);

  const fetchInformes = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const response = await axios.get('/api/informes/', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setInformes(response.data);
    } catch (err) {
      console.error('Error al cargar informes:', err);
      setError('Error al cargar los informes');
    } finally {
      setLoading(false);
    }
  };

  const generarInforme = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Validaciones
      if (!nuevoInforme.fecha_inicio || !nuevoInforme.fecha_fin) {
        setError('Por favor seleccione las fechas');
        return;
      }

      const token = localStorage.getItem('access_token');
      const response = await axios.post('/api/informes/', nuevoInforme, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setSuccess('Informe en generación');
      setNuevoInforme({
        tipo: 'GENERAL',
        formato: 'PDF',
        fecha_inicio: '',
        fecha_fin: ''
      });
      fetchInformes();
    } catch (err) {
      console.error('Error completo:', err);
      setError(err.response?.data?.detail || 'Error al generar el informe');
    } finally {
      setLoading(false);
    }
  };

  const regenerarInforme = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      await axios.post(`/api/informes/${id}/regenerar/`, {}, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setSuccess('Regeneración iniciada');
      fetchInformes();
    } catch (err) {
      setError('Error al regenerar el informe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Generar Informe</h2>
      
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Informe
            </label>
            <select
              value={nuevoInforme.tipo}
              onChange={(e) => setNuevoInforme({...nuevoInforme, tipo: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="GENERAL">Informe General</option>
              <option value="PRESTAMOS">Informe de Préstamos</option>
              <option value="TRANSACCIONES">Informe de Transacciones</option>
              <option value="CUENTAS">Estado de Cuentas</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Formato
            </label>
            <select
              value={nuevoInforme.formato}
              onChange={(e) => setNuevoInforme({...nuevoInforme, formato: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="PDF">PDF</option>
              <option value="EXCEL">Excel</option>
              <option value="CSV">CSV</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Inicio
            </label>
            <input
              type="date"
              value={nuevoInforme.fecha_inicio}
              onChange={(e) => setNuevoInforme({...nuevoInforme, fecha_inicio: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Fin
            </label>
            <input
              type="date"
              value={nuevoInforme.fecha_fin}
              onChange={(e) => setNuevoInforme({...nuevoInforme, fecha_fin: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <button
          onClick={generarInforme}
          disabled={loading}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Generando...' : 'Generar Informe'}
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
      </div>

      {/* Lista de Informes */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Informes Generados</h3>
        
        {informes.length > 0 ? (
          <div className="space-y-4">
            {informes.map((informe) => (
              <div key={informe.id} className="border p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{informe.tipo}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(informe.fecha_inicio).toLocaleDateString()} - 
                      {new Date(informe.fecha_fin).toLocaleDateString()}
                    </p>
                    <p className="text-sm">Estado: 
                      <span className={`ml-1 ${
                        informe.estado === 'COMPLETADO' ? 'text-green-600' :
                        informe.estado === 'ERROR' ? 'text-red-600' :
                        'text-yellow-600'
                      }`}>
                        {informe.estado}
                      </span>
                    </p>
                  </div>
                  
                  <div className="space-x-2">
                    {informe.archivo_generado && (
                      <a
                        href={informe.archivo_generado}
                        className="inline-block bg-green-500 text-white px-3 py-1 rounded-md text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Descargar
                      </a>
                    )}
                    
                    {informe.estado === 'ERROR' && (
                      <button
                        onClick={() => regenerarInforme(informe.id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600"
                        >
                          Regenerar
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {informe.estado === 'ERROR' && informe.mensaje_error && (
                    <div className="mt-2 text-sm text-red-600">
                      Error: {informe.mensaje_error}
                    </div>
                  )}
  
                  {informe.detalles && informe.detalles.length > 0 && (
                    <div className="mt-3 text-sm">
                      <p className="font-medium">Detalles:</p>
                      <ul className="list-disc list-inside pl-4 mt-1">
                        {informe.detalles.map((detalle, idx) => (
                          <li key={idx}>
                            {detalle.seccion}: {detalle.cantidad_registros} registros,
                            Total: ${detalle.total.toLocaleString()}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No hay informes generados</p>
          )}
        </div>
  
        {/* Modal de Carga */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-center mt-4">Procesando...</p>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default InformesView;