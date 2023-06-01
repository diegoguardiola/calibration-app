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
        <form onSubmit={handleSubmit}>
            <div className='Client_Information'>
                <div>
                    <label htmlFor="clientName">Client Name:</label>
                    <input
                    type="text"
                    id="clientName"
                    name="clientName"
                    value={clientInformation.clientName}
                    onChange={handleInputChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="clientAddress">Client Address:</label>
                    <input
                    type="text"
                    id="clientAddress"
                    name="clientAddress"
                    value={clientInformation.clientAddress}
                    onChange={handleInputChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="clientPhone">Client Phone:</label>
                    <input
                    type="text"
                    id="clientPhone"
                    name="clientPhone"
                    value={clientInformation.clientPhone}
                    onChange={handleInputChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="clientEmail">Client Email:</label>
                    <input
                    type="email"
                    id="clientEmail"
                    name="clientEmail"
                    value={clientInformation.clientEmail}
                    onChange={handleInputChange}
                    required
                    />
                </div>
            </div>
            <br />
            <br />
            <div className='Equipment_Information'>
                <div>
                    <label htmlFor="equipmentId">Equipment ID:</label>
                    <input
                    type="text"
                    id="equipmentId"
                    name="equipmentId"
                    value={equipmentInformation.equipmentId}
                    onChange={handleInputChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="equipmentManufacturer">Equipment Manufacturer:</label>
                    <input
                    type="text"
                    id="equipmentManufacturer"
                    name="equipmentManufacturer"
                    value={equipmentInformation.equipmentManufacturer}
                    onChange={handleInputChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="equipmentModelNumber">Equipment Model Number:</label>
                    <input
                    type="text"
                    id="equipmentModelNumber"
                    name="equipmentModelNumber"
                    value={equipmentInformation.equipmentModelNumber}
                    onChange={handleInputChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="equipmentSerialNumber">Equipment Serial Number:</label>
                    <input
                    type="text"
                    id="equipmentSerialNumber"
                    name="equipmentSerialNumber"
                    value={equipmentInformation.equipmentSerialNumber}
                    onChange={handleInputChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="equipmentTolerance">Equipment Tolerance:</label>
                    <input
                    type="text"
                    id="equipmentTolerance"
                    name="equipmentTolerance"
                    value={equipmentInformation.equipmentTolerance}
                    onChange={handleInputChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="unit">Unit:</label>
                    <input
                    type="text"
                    id="unit"
                    name="unit"
                    value={equipmentInformation.unit}
                    onChange={handleInputChange}
                    required
                    />
                </div>
            </div>
            <br />
            <br />
            <div className='Calibration_Information'>
                <div>
                    <label htmlFor="calibrationProcedure">Calibration Procedure:</label>
                    <input
                    type="text"
                    id="calibrationProcedure"
                    name="calibrationProcedure"
                    value={calibrationInformation.calibrationProcedure}
                    onChange={handleInputChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="calibrationToolId">Calibration Tool ID:</label>
                    <input
                    type="text"
                    id="calibrationToolId"
                    name="calibrationToolId"
                    value={calibrationInformation.calibrationToolId}
                    onChange={handleInputChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="calibrationToolManufacturer">Calibration Tool Manufacturer:</label>
                    <input
                    type="text"
                    id="calibrationToolManufacturer"
                    name="calibrationToolManufacturer"
                    value={calibrationInformation.calibrationToolManufacturer}
                    onChange={handleInputChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="calibrationToolMN">Calibration Tool Model Number:</label>
                    <input
                    type="text"
                    id="calibrationToolMN"
                    name="calibrationToolMN"
                    value={calibrationInformation.calibrationToolMN}
                    onChange={handleInputChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="calibrationToolSN">Calibration Tool Serial Number:</label>
                    <input
                    type="text"
                    id="calibrationToolSN"
                    name="calibrationToolSN"
                    value={calibrationInformation.calibrationToolSN}
                    onChange={handleInputChange}
                    required
                    />
                </div>
            </div>
            <br />
            <br />
            <div className='Result_Information'>
                <div>
                    <label htmlFor="setpoint1">Setpoint 1:</label>
                    <input
                    type="text"
                    id="setpoint1"
                    name="setpoint1"
                    value={results.setpoint1}
                    onChange={handleInputChange}
                    required
                    />
                    <label htmlFor="asLeft1">As Left 1:</label>
                    <input
                    type="text"
                    id="asLeft1"
                    name="asLeft1"
                    value={results.asLeft1}
                    onChange={handleInputChange}
                    required
                    />
                    <label htmlFor="asFound1">As Fount 1:</label>
                    <input
                    type="text"
                    id="asFound1"
                    name="asFound1"
                    value={results.asFound1}
                    onChange={handleInputChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="setpoint2">Setpoint 2:</label>
                    <input
                    type="text"
                    id="setpoint2"
                    name="setpoint2"
                    value={results.setpoint2}
                    onChange={handleInputChange}
                    required
                    />
                    <label htmlFor="asLeft2">As Left 2:</label>
                    <input
                    type="text"
                    id="asLeft2"
                    name="asLeft2"
                    value={results.asLeft2}
                    onChange={handleInputChange}
                    required
                    />
                    <label htmlFor="asFound2">As Fount 2:</label>
                    <input
                    type="text"
                    id="asFound2"
                    name="asFound2"
                    value={results.asFound2}
                    onChange={handleInputChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="setpoint3">Setpoint 3:</label>
                    <input
                    type="text"
                    id="setpoint3"
                    name="setpoint3"
                    value={results.setpoint3}
                    onChange={handleInputChange}
                    required
                    />
                    <label htmlFor="asLeft3">As Left 3:</label>
                    <input
                    type="text"
                    id="asLeft3"
                    name="asLeft3"
                    value={results.asLeft3}
                    onChange={handleInputChange}
                    required
                    />
                    <label htmlFor="asFound3">As Fount 3:</label>
                    <input
                    type="text"
                    id="asFound3"
                    name="asFound3"
                    value={results.asFound3}
                    onChange={handleInputChange}
                    required
                    />
                </div>
            </div>
            <br />
             <br />

          <button type="submit">Submit</button>
        </form>
      );
    };

export default Calibration;
