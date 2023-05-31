import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navibar from './components/NaviBar';
import Home from './pages/Home';
import PO from './pages/PO';
import Calibration from './pages/Calibration';

const App = () => {
  return (
    <Router>
      <div>
        <Navibar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/po" element={<PO />} />
          <Route path="/calibration" element={<Calibration />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
