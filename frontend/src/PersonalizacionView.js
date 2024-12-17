import React, { useState } from 'react';
import axios from 'axios';

const PersonalizacionView = () => {
  const [tema, setTema] = useState('light');
  const [fuente, setFuente] = useState('default');
  const [layout, setLayout] = useState('default');
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);

  const handleGuardarPersonalizacion = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      await axios.put('/api/usuarios/personalizacion/', {
        tema,
        fuente,
        layout
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setError('');
      setExito(true);
    } catch (err) {
      setError(`Error al guardar la personalización: ${err.response.data.error}`);
      setExito(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Personalizar Interfaz</h2>
      {exito ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p>La personalización se ha guardado exitosamente.</p>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <label htmlFor="tema" className="block text-gray-700 font-medium mb-2">
              Tema
            </label>
            <select
              id="tema"
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            >
              <option value="light">Claro</option>
              <option value="dark">Oscuro</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="fuente" className="block text-gray-700 font-medium mb-2">
              Fuente
            </label>
            <select
              id="fuente"
              value={fuente}
              onChange={(e) => setFuente(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            >
              <option value="default">Predeterminada</option>
              <option value="serif">Serif</option>
              <option value="sans-serif">Sans-Serif</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="layout" className="block text-gray-700 font-medium mb-2">
              Diseño
            </label>
            <select
              id="layout"
              value={layout}
              onChange={(e) => setLayout(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            >
              <option value="default">Predeterminado</option>
              <option value="compact">Compacto</option>
              <option value="expandido">Expandido</option>
            </select>
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <button
            onClick={handleGuardarPersonalizacion}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Guardar Personalización
          </button>
        </>
      )}
    </div>
  );
};

export default PersonalizacionView; 