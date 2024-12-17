import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PresupuestosView = () => {
  const [presupuestos, setPresupuestos] = useState([]);
  const [categoria, setCategoria] = useState('');
  const [monto, setMonto] = useState(0);
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);

  useEffect(() => {
    const fetchPresupuestos = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await axios.get('/api/presupuestos/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setPresupuestos(response.data);
      } catch (error) {
        console.error('Error al obtener los presupuestos:', error);
      }
    };
    fetchPresupuestos();
  }, []);

  const handleGuardarPresupuesto = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      await axios.post('/api/presupuestos/', {
        categoria,
        monto
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setCategoria('');
      setMonto(0);
      setError('');
      setExito(true);
    } catch (err) {
      setError(`Error al guardar el presupuesto: ${err.response.data.error}`);
      setExito(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Gestionar Presupuestos</h2>
      {exito ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p>El presupuesto se ha guardado exitosamente.</p>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <label htmlFor="categoria" className="block text-gray-700 font-medium mb-2">
              Categoría
            </label>
            <input
              type="text"
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
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
            onClick={handleGuardarPresupuesto}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Guardar Presupuesto
          </button>
        </>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Mis Presupuestos</h3>
        {presupuestos.length > 0 ? (
          <div className="space-y-4">
            {presupuestos.map((presupuesto) => (
              <div key={presupuesto.id} className="bg-gray-100 rounded-md p-4">
                <h4 className="text-lg font-medium">{presupuesto.categoria}</h4>
                <p className="text-gray-600">Monto: {presupuesto.monto.toFixed(2)} USD</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No tienes presupuestos creados todavía.</p>
        )}
      </div>
    </div>
  );
};

export default PresupuestosView;