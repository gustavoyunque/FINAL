import React, { useState } from 'react';
import axios from 'axios';

const SoporteView = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);

  const handleEnviarSolicitud = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      await axios.post('/api/soporte/', {
        nombre,
        email,
        asunto,
        mensaje
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setNombre('');
      setEmail('');
      setAsunto('');
      setMensaje('');
      setError('');
      setExito(true);
    } catch (err) {
      setError(`Error al enviar la solicitud: ${err.response.data.error}`);
      setExito(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Soporte y Asistencia</h2>
      {exito ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p>Tu solicitud de soporte ha sido enviada exitosamente.</p>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-700 font-medium mb-2">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="asunto" className="block text-gray-700 font-medium mb-2">
              Asunto
            </label>
            <input
              type="text"
              id="asunto"
              value={asunto}
              onChange={(e) => setAsunto(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="mensaje" className="block text-gray-700 font-medium mb-2">
              Mensaje
            </label>
            <textarea
              id="mensaje"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full h-32"
            ></textarea>
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <button
            onClick={handleEnviarSolicitud}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Enviar Solicitud
          </button>
        </>
      )}
    </div>
  );
};

export default SoporteView;