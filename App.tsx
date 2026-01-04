
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { VehicleDetails } from './pages/VehicleDetails';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';
import { Vehicle } from './types';
import { INITIAL_VEHICLES } from './constants';

const App: React.FC = () => {
  const [vehicles, setVehicles] = React.useState<Vehicle[]>(() => {
    const saved = localStorage.getItem('autoelite_vehicles');
    return saved ? JSON.parse(saved) : INITIAL_VEHICLES;
  });

  const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
    return localStorage.getItem('autoelite_auth') === 'true';
  });

  React.useEffect(() => {
    localStorage.setItem('autoelite_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('autoelite_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('autoelite_auth');
  };

  const addVehicle = (v: Vehicle) => setVehicles([v, ...vehicles]);
  const updateVehicle = (v: Vehicle) => setVehicles(vehicles.map(item => item.id === v.id ? v : item));
  const deleteVehicle = (id: string) => {
    if (window.confirm('Tem a certeza que deseja eliminar este anúncio?')) {
      setVehicles(vehicles.filter(v => v.id !== id));
    }
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home vehicles={vehicles} />} />
          <Route path="/catalogo" element={<Catalog vehicles={vehicles} />} />
          <Route path="/veiculo/:id" element={<VehicleDetails vehicles={vehicles} />} />
          
          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={isAuthenticated ? <Navigate to="/admin/dashboard" /> : <Login onLogin={handleLogin} />} 
          />
          <Route 
            path="/admin/dashboard" 
            element={
              isAuthenticated ? (
                <AdminDashboard 
                  vehicles={vehicles} 
                  onAdd={addVehicle}
                  onUpdate={updateVehicle}
                  onDelete={deleteVehicle}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/admin" />
              )
            } 
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
