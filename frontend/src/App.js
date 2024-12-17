import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  const isAuthenticated = accessToken && refreshToken;

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-white shadow py-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Sistema Bancario</h1>
            {isAuthenticated && (
              <nav>
                <ul className="flex space-x-4">
                  <li><a href="/" className="hover:text-blue-500">Inicio</a></li>
                  <li><a href="/cuentas" className="hover:text-blue-500">Cuentas</a></li>
                  <li><a href="/transacciones" className="hover:text-blue-500">Transacciones</a></li>
                  <li><a href="/prestamos" className="hover:text-blue-500">Préstamos</a></li>
                  <li><a href="/tarjetas" className="hover:text-blue-500">Tarjetas</a></li>
                  <li><a href="/alertas" className="hover:text-blue-500">Alertas</a></li>
                  <li><a href="/dashboard" className="hover:text-blue-500">Dashboard</a></li>
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

        <main className="container mx-auto py-8 space-y-8">
          <Routes>
            {isAuthenticated ? (
              <>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/cuentas" element={<CuentasView />} />
                <Route path="/transacciones" element={<TransaccionesView />} />
                <Route path="/prestamos" element={<PrestamosView />} />
                <Route path="/tarjetas" element={<TarjetasView />} />
                <Route path="/alertas" element={<AlertasView />} />
                <Route path="/dashboard" element={<DashboardView />} />
                <Route path="/informes" element={<InformesView />} />
                <Route path="/soporte" element={<SoporteView />} />
                <Route path="/presupuestos" element={<PresupuestosView />} />
                <Route path="/personalizacion" element={<PersonalizacionView />} />
                <Route path="/notificaciones" element={<NotificacionesView />} />
                <Route path="/recordatorios" element={<RecordatoriosView />} />
                <Route path="/perfil" element={<PerfilView />} />
              </>
            ) : (
              <Route path="*" element={<AuthView />} />
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