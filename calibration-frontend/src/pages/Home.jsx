import React, { useState, useEffect } from 'react';
import { exportToPDF } from '../components/ExportToPDF';

const CalibrationTable = () => {
    const [calibrations, setCalibrations] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/calibrations')
            .then(response => response.json())
            .then(data => setCalibrations(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <table className="table">
            <thead className="thead-dark">
                <tr>
                    <th>Export</th>
                    <th>Calibration ID</th>
                    <th>Client Name</th>
                    <th>Client Address</th>
                    {/* ...other columns as needed... */}
                    <th>As Found</th>
                </tr>
            </thead>
            <tbody>
                {calibrations.map(calibration => (
                    <tr key={calibration.calibration_id}>
                        <td>
                            <button className="btn btn-primary" onClick={() => exportToPDF(calibration)}>Export</button>
                        </td>
                        <td>{calibration.calibration_id}</td>
                        <td>{calibration.clientName}</td>
                        <td>{calibration.clientAddress}</td>
                        {/* ...other fields as needed... */}
                        <td>{calibration.asFound}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CalibrationTable;
