import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navibar from './components/NaviBar';
import Home from './pages/Home';
import PO from './pages/PO';
import Calibration from './pages/Calibration';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import CurrentUserProvider from './contexts/CurrentUser';
import 'bootstrap/dist/css/bootstrap.css';


const App = () => {
  return (
    <CurrentUserProvider>
      <Router>
        <div>
          <Navibar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/po" element={<PO />} />
            <Route path="/calibration" element={<Calibration />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
          </Routes>
        </div>
      </Router>
    </CurrentUserProvider>
  );
};

export default App;
