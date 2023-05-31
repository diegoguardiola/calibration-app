import React from 'react';
import { Link } from 'react-router-dom';

const Navibar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/po">PO</Link>
        </li>
        <li>
          <Link to="/calibration">Calibration</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navibar;
