import React, { useState, useEffect } from 'react';
import { exportToPDF } from '../components/ExportToPDF';
import { useAuthContext } from "../hooks/useAuthContext";
import { useCalibrationContext } from "../hooks/useCalibrationContext";

const Home = () => {

    const {user} = useAuthContext()
    const {calibrations, dispatch} = useCalibrationContext()

    const [sortConfig, setSortConfig] = useState(null);

    useEffect(() => {
        const fetchCalibrations = async () => {
            const response = await fetch('http://localhost:5000/c1_1/calibration',{
                headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_CALIBRATIONS', payload: json})
      }
    }

    if (user) {
        fetchCalibrations()
      }
    }, [dispatch, user])

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
          direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    let sortedCalibrations = [...calibrations];
    if (sortConfig !== null) {
        sortedCalibrations.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }

    return (
        <table className="table">
            <thead className="thead-dark">
                <tr>
                    <th>Export</th>
                    <th onClick={() => requestSort('calibration_id')}>Calibration ID</th>
                    <th onClick={() => requestSort('clientName')}>Client Name</th>
                    <th onClick={() => requestSort('calibrationProcedure')}>Calibration Procedure</th>
                    <th onClick={() => requestSort('createdAt')}>Calibration Created At</th>
                </tr>
            </thead>
            <tbody>
                {sortedCalibrations.map(calibration => (
                    <tr key={calibration.calibration_id}>
                        <td>
                            <button className="btn btn-primary" onClick={() => exportToPDF(calibration)}>Export</button>
                        </td>
                        <td>{calibration.calibration_id}</td>
                        <td>{calibration.clientName}</td>
                        <td>{calibration.calibrationProcedure}</td>
                        <td>{calibration.createdAt}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Home;
