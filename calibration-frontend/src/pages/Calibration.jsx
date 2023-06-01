import React from 'react';
import { useState } from 'react';


const Calibration = () => {


    const [clientInformation, setClientInformation] = useState({
        clientName: '',
        clientAddress: '',
        clientPhone: '',
        clientEmail: '',
    });
    const [equipmentInformation, setEquipmentInformation] = useState({
        equipmentId: '',
        calibrationType: '',
        equipmentManufacturer: '',
        equipmentModelNumber: '',
        equipmentSerialNumber: '',
        equipmentTolerance: '',
        unit: '',
    });
    const [calibrationInformation, setCalibrationInformation] = useState({
        calibrationProcedure: '',
        calibrationToolId: '',
        calibrationToolManufacturer: '',
        calibrationToolMN: '',
        calibrationToolSN: '',
    });
    const [results, setResults] = useState([{ 
        setpoint1: '',
        setpoint2: '',
        setpoint3: '',
        asLeft1: '',
        asLeft2: '',
        asLeft3: '',
        asFound1: '',
        asFound2: '',
        asFound3: '',
    }])
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
            setClientInformation({ ...clientInformation, [name]: value });
            setEquipmentInformation({ ...equipmentInformation, [name]: value });
            setCalibrationInformation({ ...calibrationInformation, [name]: value });
            setResults({ ...results, [name]: value });  
        };    

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here we create an object with all the data we want to submit.
        const data = {
          ...clientInformation,
          ...equipmentInformation,
          ...results
        };
        
        await fetch('http://localhost:5000/calibrations', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})

        resetForm();
    };
    
    const resetForm = () => {
        // Reset the form
        setClientInformation({
            clientName: '',
            clientAddress: '',
            clientPhone: '',
            clientEmail: '',
        });
        setEquipmentInformation({
            equipmentId: '',
            equipmentManufacturer: '',
            equipmentModelNumber: '',
            equipmentSerialNumber: '',
            equipmentTolerance: '',
            unit: '',
        });
        setCalibrationInformation({
            calibrationProcedure: '',
            calibrationToolId: '',
            calibrationToolManufacturer: '',
            calibrationToolMN: '',
            calibrationToolSN: '',
        });
        setResults({ 
            setpoint1: '',
            setpoint2: '',
            setpoint3: '',
            asLeft1: '',
            asLeft2: '',
            asLeft3: '',
            asFound1: '',
            asFound2: '',
            asFound3: '',
        })
    }
    
    
      return (
        <form className="container" onSubmit={handleSubmit}>
            <div className='Client_Information'>
                <div className="form-group">
                    <label htmlFor="clientName">Client Name:</label>
                    <input
                    type="text"
                    id="clientName"
                    name="clientName"
                    value={clientInformation.clientName}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="clientAddress">Client Address:</label>
                    <input
                    type="text"
                    id="clientAddress"
                    name="clientAddress"
                    value={clientInformation.clientAddress}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="clientPhone">Client Phone:</label>
                    <input
                    type="text"
                    id="clientPhone"
                    name="clientPhone"
                    value={clientInformation.clientPhone}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="clientEmail">Client Email:</label>
                    <input
                    type="email"
                    id="clientEmail"
                    name="clientEmail"
                    value={clientInformation.clientEmail}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    />
                </div>
            </div>
            <br />
            <br />
            <div className='Equipment_Information'>
                <div className="form-group">
                    <label htmlFor="equipmentId">Equipment ID:</label>
                    <input
                    type="text"
                    id="equipmentId"
                    name="equipmentId"
                    value={equipmentInformation.equipmentId}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="equipmentManufacturer">Equipment Manufacturer:</label>
                    <input
                    type="text"
                    id="equipmentManufacturer"
                    name="equipmentManufacturer"
                    value={equipmentInformation.equipmentManufacturer}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="equipmentModelNumber">Equipment Model Number:</label>
                    <input
                    type="text"
                    id="equipmentModelNumber"
                    name="equipmentModelNumber"
                    value={equipmentInformation.equipmentModelNumber}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="equipmentSerialNumber">Equipment Serial Number:</label>
                    <input
                    type="text"
                    id="equipmentSerialNumber"
                    name="equipmentSerialNumber"
                    value={equipmentInformation.equipmentSerialNumber}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="equipmentTolerance">Equipment Tolerance:</label>
                    <input
                    type="text"
                    id="equipmentTolerance"
                    name="equipmentTolerance"
                    value={equipmentInformation.equipmentTolerance}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="unit">Unit:</label>
                    <input
                    type="text"
                    id="unit"
                    name="unit"
                    value={equipmentInformation.unit}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    />
                </div>
            </div>
            <br />
            <br />
            <div className='Calibration_Information'>
                <div className="form-group">
                    <label htmlFor="calibrationProcedure">Calibration Procedure:</label>
                    <input
                    type="text"
                    id="calibrationProcedure"
                    name="calibrationProcedure"
                    value={calibrationInformation.calibrationProcedure}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="calibrationToolId">Calibration Tool ID:</label>
                    <input
                    type="text"
                    id="calibrationToolId"
                    name="calibrationToolId"
                    value={calibrationInformation.calibrationToolId}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="calibrationToolManufacturer">Calibration Tool Manufacturer:</label>
                    <input
                    type="text"
                    id="calibrationToolManufacturer"
                    name="calibrationToolManufacturer"
                    value={calibrationInformation.calibrationToolManufacturer}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="calibrationToolMN">Calibration Tool Model Number:</label>
                    <input
                    type="text"
                    id="calibrationToolMN"
                    name="calibrationToolMN"
                    value={calibrationInformation.calibrationToolMN}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="calibrationToolSN">Calibration Tool Serial Number:</label>
                    <input
                    type="text"
                    id="calibrationToolSN"
                    name="calibrationToolSN"
                    value={calibrationInformation.calibrationToolSN}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    />
                </div>
            </div>
            <br />
            <br />
            <div className='Result_Information'>
                <div className="form-group">
                    <label htmlFor="setpoint1">Setpoint 1:</label>
                    <input
                    type="text"
                    id="setpoint1"
                    name="setpoint1"
                    value={results.setpoint1}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    />
                    <label htmlFor="asLeft1">As Left 1:</label>
                    <input
                    type="text"
                    id="asLeft1"
                    name="asLeft1"
                    value={results.asLeft1}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    />
                    <label htmlFor="asFound1">As Found 1:</label>
                    <input
                    type="text"
                    id="asFound1"
                    name="asFound1"
                    value={results.asFound1}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="setpoint2">Setpoint 2:</label>
                    <input
                    type="text"
                    id="setpoint2"
                    name="setpoint2"
                    value={results.setpoint2}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    />
                    <label htmlFor="asLeft2">As Left 2:</label>
                    <input
                    type="text"
                    id="asLeft2"
                    name="asLeft2"
                    value={results.asLeft2}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    />
                    <label htmlFor="asFound2">As Found 2:</label>
                    <input
                    type="text"
                    id="asFound2"
                    name="asFound2"
                    value={results.asFound2}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="setpoint3">Setpoint 3:</label>
                    <input
                    type="text"
                    id="setpoint3"
                    name="setpoint3"
                    value={results.setpoint3}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    />
                    <label htmlFor="asLeft3">As Left 3:</label>
                    <input
                    type="text"
                    id="asLeft3"
                    name="asLeft3"
                    value={results.asLeft3}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    />
                    <label htmlFor="asFound3">As Found 3:</label>
                    <input
                    type="text"
                    id="asFound3"
                    name="asFound3"
                    value={results.asFound3}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    />
                </div>
            </div>
            <br />
             <br />

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      );
    };

export default Calibration;
