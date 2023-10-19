import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext'
// pages & components
import Navibar from './components/NaviBar';
import Home from './pages/Home';
import Calibration from './pages/Calibration';
import Admin from './pages/Admin';
import EquipmentRegistery from './pages/EquipmentRegistery';
import ProtectedRoute from './components/protectedRoute';
import SignUpForm from './components/Forms/SignUpForm';
import LoginForm from './components/Forms/LoginForm';
import 'bootstrap/dist/css/bootstrap.css';


const App = () => {
  
  const {user} = useAuthContext()

  return (
      <Router>
        <div>
          <Navibar />
          <Routes>
            <Route
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route 
              path="/calibration" 
              element={user ? <Calibration /> : <Navigate to="/login" />}
            />
            <Route path="/equipment-regisrty" element={
              <ProtectedRoute>
                <EquipmentRegistery />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } />
            <Route
              path="/login" 
              element={!user ? <LoginForm /> : <Navigate to="/" />} 
            />
            <Route
              path="/signup" 
              element={!user ? <SignUpForm /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </Router>
  );
};

export default App;