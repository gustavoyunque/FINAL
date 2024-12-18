import React, { useState } from 'react';

const SoporteView = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('access_token');
      console.log('Token usado:', token); // Para debug

      if (!token) {
        throw new Error('No hay token de acceso');
      }

      const response = await fetch('http://127.0.0.1:8000/api/soporte/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Error al enviar la solicitud');
      }

      setExito(true);
      setFormData({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: ''
      });
    } catch (err) {
      setError(err.message || 'Error al enviar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  if (exito) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <p>Tu solicitud de soporte ha sido enviada exitosamente.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Soporte y Asistencia</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-gray-700 font-medium mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="asunto" className="block text-gray-700 font-medium mb-2">
            Asunto
          </label>
          <input
            type="text"
            id="asunto"
            name="asunto"
            value={formData.asunto}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="mensaje" className="block text-gray-700 font-medium mb-2">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full h-32"
            required
          />
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Enviando...' : 'Enviar Solicitud'}
        </button>
      </form>
    </div>
  );
};

export default SoporteView;