import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext'
// pages & components
import Navibar from './components/NaviBar';
import CalibrationListEngineer from './pages/CalibrationListEngineer';
import CalibrationListClient from './pages/CalibrationListClient';
import Calibration from './pages/Calibration';
import Admin from './pages/Admin';
import EquipmentRegistery from './pages/EquipmentRegistery';
import ProfileInfo from './pages/ProfileInfo';
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
              path="/calibration-list-engineer"
              element={
                <ProtectedRoute allowedRoles={['admin', 'engineer']}>
                  <CalibrationListEngineer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/calibration-list-client"
              element={

                  <CalibrationListClient />

              }
            />
            <Route 
              path="/calibration-report-entry" 
              element={
                <ProtectedRoute allowedRoles={['admin', 'engineer']}>
                  <Calibration />
                </ProtectedRoute>
              }
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
              path="/profile-info" 
              element={<ProfileInfo/>}
            />
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