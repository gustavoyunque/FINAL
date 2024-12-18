import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';

const DashboardView = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Obtener información del usuario al cargar el componente
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/usuarios/me/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        const data = await response.json();
        setUsername(data.username);
      } catch (error) {
        console.error('Error al obtener información del usuario:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const menuItems = [
    { title: 'Cuentas', path: '/cuentas', description: 'Administra tus cuentas bancarias' },
    { title: 'Transacciones', path: '/transacciones', description: 'Ver historial de transacciones' },
    { title: 'Préstamos', path: '/prestamos', description: 'Gestiona tus préstamos' },
    { title: 'Tarjetas', path: '/tarjetas', description: 'Administra tus tarjetas' },
    { title: 'Soporte', path: '/soporte', description: 'Obtén ayuda y soporte' },
    { title: 'Presupuestos', path: '/presupuestos', description: 'Planifica tus finanzas' },
    { title: 'Informes', path: '/informes', description: 'Ver informes financieros' },
    { title: 'Notificaciones', path: '/notificaciones', description: 'Centro de notificaciones' },
    { title: 'Perfil', path: '/perfil', description: 'Gestiona tu perfil' }
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold mb-2 section-title">Bienvenido, {username}</h1>
        <p className="text-gray-600">¿Qué te gustaría hacer hoy?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 card">
              <h2 className="text-xl font-bold mb-2">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};



export default DashboardView;