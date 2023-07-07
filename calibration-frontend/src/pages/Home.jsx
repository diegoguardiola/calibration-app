import React, { useState, useEffect } from 'react';
import { exportToPDF } from '../components/ExportToPDF';
import { useAuthContext } from "../hooks/useAuthContext";
import { useCalibrationContext } from "../hooks/useCalibrationContext";


const Home = () => {

    const {user} = useAuthContext()
    const {calibrations, dispatch} = useCalibrationContext()

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
     



    return (
        <table className="table">
            <thead className="thead-dark">
                <tr>
                    <th>Export</th>
                    <th>Calibration ID</th>
                    <th>Client Name</th>
                    <th>Calibration Procedure</th>
                    <th>Calibration Created At</th>

                    
                </tr>
            </thead>
            <tbody>
                {calibrations?.map(calibration => (
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