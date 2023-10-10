import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext'
// pages & components
import Navibar from './components/NaviBar';
import Home from './pages/Home';
import Calibration from './pages/Calibration';
import SignUpForm from './pages/SignUpForm';
import LoginForm from './pages/LoginForm';
import PrivateRoute from './routes/adminRoute';
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
            <Route
              path="/login" 
              element={!user ? <LoginForm /> : <Navigate to="/" />} 
            />
            {/*<Route
              path="/signup" 
              element={!user ? <SignUpForm /> : <Navigate to="/" />}
            />*/}
            <Route 
                path="/signup" 
                element={
                    <PrivateRoute requiredRole="admin">
                        <SignUpForm />
                    </PrivateRoute>
                } 
            />


          </Routes>
        </div>
      </Router>
  );
};

export default App;
