import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, addDays } from 'date-fns';

const RecordatoriosView = () => {
  const [recordatorios, setRecordatorios] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState(addDays(new Date(), 7));
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);

  useEffect(() => {
    const fetchRecordatorios = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await axios.get('/api/recordatorios/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setRecordatorios(response.data);
      } catch (error) {
        console.error('Error al obtener los recordatorios:', error);
      }
    };
    fetchRecordatorios();
  }, []);

  const handleGuardarRecordatorio = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      await axios.post('/api/recordatorios/', {
        titulo,
        fecha: format(fecha, 'yyyy-MM-dd')
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setTitulo('');
      setFecha(addDays(new Date(), 7));
      setError('');
      setExito(true);
    } catch (err) {
      setError(`Error al guardar el recordatorio: ${err.response.data.error}`);
      setExito(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Programar Recordatorios</h2>
      {exito ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p>El recordatorio se ha guardado exitosamente.</p>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <label htmlFor="titulo" className="block text-gray-700 font-medium mb-2">
              Título
            </label>
            <input
              type="text"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fecha" className="block text-gray-700 font-medium mb-2">
              Fecha
            </label>
            <input
              type="date"
              id="fecha"
              value={format(fecha, 'yyyy-MM-dd')}
              onChange={(e) => setFecha(new Date(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <button
            onClick={handleGuardarRecordatorio}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Guardar Recordatorio
          </button>
        </>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Mis Recordatorios</h3>
        {recordatorios.length > 0 ? (
          <div className="space-y-4">
            {recordatorios.map((recordatorio) => (
              <div key={recordatorio.id} className="bg-gray-100 rounded-md p-4">
                <h4 className="text-lg font-medium">{recordatorio.titulo}</h4>
                <p className="text-gray-600">Fecha: {new Date(recordatorio.fecha).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No tienes recordatorios programados todavía.</p>
        )}
      </div>
    </div>
  );
};

export default RecordatoriosView;