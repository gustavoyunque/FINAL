import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import CuentasView from './CuentasView';
import TransaccionesView from './TransaccionesView';
import PrestamosView from './PrestamosView';
import TarjetasView from './TarjetasView';
import AlertasView from './AlertasView';
import DashboardView from './DashboardView';
import InformesView from './InformesView';
import SoporteView from './SoporteView';
import PresupuestosView from './PresupuestosView';
import PersonalizacionView from './PersonalizacionView';
import NotificacionesView from './NotificacionesView';
import RecordatoriosView from './RecordatoriosView';
import AuthView from './AuthView';
import PerfilView from './PerfilView';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        try {
          // Cambiamos la URL para verificar el token y obtener la información del usuario
          const response = await fetch('http://127.0.0.1:8000/api/usuarios/me/', {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });

          if (!response.ok) {
            throw new Error('Token inválido');
          }

          const userData = await response.json();
          setUsername(userData.username);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error de autenticación:', error);
          setIsAuthenticated(false);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    verifyToken();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-white shadow py-4">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Sistema Bancario</h1>
              {isAuthenticated && (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">Bienvenido, {username}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
            {isAuthenticated && (
              <nav className="mt-4">
                <ul className="flex space-x-6 overflow-x-auto">
                  <li><a href="/dashboard" className="hover:text-blue-500">Dashboard</a></li>
                  <li><a href="/cuentas" className="hover:text-blue-500">Cuentas</a></li>
                  <li><a href="/transacciones" className="hover:text-blue-500">Transacciones</a></li>
                  <li><a href="/prestamos" className="hover:text-blue-500">Préstamos</a></li>
                  <li><a href="/tarjetas" className="hover:text-blue-500">Tarjetas</a></li>
                  <li><a href="/alertas" className="hover:text-blue-500">Alertas</a></li>
                  <li><a href="/informes" className="hover:text-blue-500">Informes</a></li>
                  <li><a href="/soporte" className="hover:text-blue-500">Soporte</a></li>
                  <li><a href="/presupuestos" className="hover:text-blue-500">Presupuestos</a></li>
                  <li><a href="/personalizacion" className="hover:text-blue-500">Personalización</a></li>
                  <li><a href="/notificaciones" className="hover:text-blue-500">Notificaciones</a></li>
                  <li><a href="/recordatorios" className="hover:text-blue-500">Recordatorios</a></li>
                  <li><a href="/perfil" className="hover:text-blue-500">Perfil</a></li>
                </ul>
              </nav>
            )}
          </div>
        </header>

        <main className="container mx-auto py-8">
          <Routes>
            {isAuthenticated ? (
              <>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<DashboardView />} />
                <Route path="/cuentas" element={<CuentasView />} />
                <Route path="/transacciones" element={<TransaccionesView />} />
                <Route path="/prestamos" element={<PrestamosView />} />
                <Route path="/tarjetas" element={<TarjetasView />} />
                <Route path="/alertas" element={<AlertasView />} />
                <Route path="/informes" element={<InformesView />} />
                <Route path="/soporte" element={<SoporteView />} />
                <Route path="/presupuestos" element={<PresupuestosView />} />
                <Route path="/personalizacion" element={<PersonalizacionView />} />
                <Route path="/notificaciones" element={<NotificacionesView />} />
                <Route path="/recordatorios" element={<RecordatoriosView />} />
                <Route path="/perfil" element={<PerfilView />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<AuthView />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            )}
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto text-center">
            <p>&copy; 2023 Sistema Bancario</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;