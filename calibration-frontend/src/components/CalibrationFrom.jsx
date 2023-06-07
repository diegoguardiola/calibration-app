import { useState } from "react";
import { useCalibrationContext } from "../hooks/useCalibrationContext";
import { useAuthContext } from "../hooks/useAuthContext";

export const CalibrationForm = () => {
    const {dispatch} = useCalibrationContext()
    console.log(dispatch);
    const {user} = useAuthContext()

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
    const [results, setResults] = useState({ 
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
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        if (!user) {
          setError('You must be logged in')
          return
        }
    
        const data = {
            ...clientInformation,
            ...equipmentInformation,
            ...results
          };
    
        const response = await fetch('http://localhost:5000/c1_1/calibration', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
          }
        // Reset the form
        if (response.ok) {
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
        setError(null)
        setEmptyFields([])
        console.log('new calibration added', json)
        dispatch({type: 'CREATE_CALIBRATION', payload: json})
        }
  }
    
    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className='Client_Information'>
                <div className="form-group">
                    <label>Client Name:</label>
                    <input
                    type="text"
                    value={clientInformation.clientName}
                    onChange={(e) => setClientInformation({ ...clientInformation, clientName: e.target.value })}
                    className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Client Address:</label>
                    <input
                    type="text"
                    value={clientInformation.clientAddress}
                    onChange={(e) => setClientInformation({ ...clientInformation, clientAddress: e.target.value })}
                    className="form-control"      
                    />
                </div>
                <div className="form-group">
                    <label>Client Phone:</label>
                    <input
                    type="text"
                    value={clientInformation.clientPhone}
                    onChange={(e) => setClientInformation({ ...clientInformation, clientPhone: e.target.value })}
                    className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Client Email:</label>
                    <input
                    type="email"
                    value={clientInformation.clientEmail}
                    onChange={(e) => setClientInformation({ ...clientInformation, clientEmail: e.target.value })}
                    className="form-control"
                    />
                </div>
            </div>
            <div className='Equipment_Information'>
                <div className="form-group">
                    <label>Equipment ID:</label>
                    <input
                    type="text"
                    value={equipmentInformation.equipmentId}
                    onChange={(e) => setEquipmentInformation({ ...equipmentInformation, equipmentId: e.target.value })}
                    className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Equipment Manufacturer:</label>
                    <input
                    type="text"
                    value={equipmentInformation.equipmentManufacturer}
                    onChange={(e) => setEquipmentInformation({ ...equipmentInformation, equipmentManufacturer: e.target.value })}
                    className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Equipment Model Number:</label>
                    <input
                    type="text"
                    value={equipmentInformation.equipmentModelNumber}
                    onChange={(e) => setEquipmentInformation({ ...equipmentInformation, equipmentModelNumber: e.target.value })}
                    className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Equipment Serial Number:</label>
                    <input
                    type="text"
                    value={equipmentInformation.equipmentSerialNumber}
                    onChange={(e) => setEquipmentInformation({ ...equipmentInformation, equipmentSerialNumber: e.target.value })}
                    className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Equipment Tolerance:</label>
                    <input
                    type="text"
                    value={equipmentInformation.equipmentTolerance}
                    onChange={(e) => setEquipmentInformation({ ...equipmentInformation, equipmentTolerance: e.target.value })}
                    className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Unit:</label>
                    <input
                    type="text"
                    value={equipmentInformation.unit}
                    onChange={(e) => setEquipmentInformation({ ...equipmentInformation, unit: e.target.value })}
                    className="form-control"
                    />
                </div>
            </div>
            <div className='Calibration_Information'>
                <div className="form-group">
                    <label>Calibration Procedure:</label>
                    <input
                    type="text"
                    value={calibrationInformation.calibrationProcedure}
                    onChange={(e) => setCalibrationInformation({ ...calibrationInformation, calibrationProcedure: e.target.value })}
                    className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Calibration Tool ID:</label>
                    <input
                    type="text"
                    value={calibrationInformation.calibrationToolId}
                    onChange={(e) => setCalibrationInformation({ ...calibrationInformation, calibrationToolId: e.target.value })}
                    className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Calibration Tool Manufacturer:</label>
                    <input
                    type="text"
                    value={calibrationInformation.calibrationToolManufacturer}
                    onChange={(e) => setCalibrationInformation({ ...calibrationInformation, calibrationToolManufacturer: e.target.value })}
                    className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Calibration Tool Model Number:</label>
                    <input
                    type="text"
                    value={calibrationInformation.calibrationToolMN}
                    onChange={(e) => setCalibrationInformation({ ...calibrationInformation, calibrationToolMN: e.target.value })}
                    className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Calibration Tool Serial Number:</label>
                    <input
                    type="text"
                    value={calibrationInformation.calibrationToolSN}
                    onChange={(e) => setCalibrationInformation({ ...calibrationInformation, calibrationToolSN: e.target.value })}
                    className="form-control"
                    />
                </div>
            </div>
            <div className='Result_Information'>
                <div className="form-group">
                    <label>Setpoint 1:</label>
                    <input
                    type="text"
                    value={results.setpoint1}
                    onChange={(e) => setResults({ ...results, setpoint1: e.target.value })}
                    className="form-control"
                    />
                    <label>As Left 1:</label>
                    <input
                    type="text"
                    value={results.asLeft1}
                    onChange={(e) => setResults({ ...results, asLeft1: e.target.value })}
                    className="form-control"
                    />
                    <label>As Found 1:</label>
                    <input
                    type="text"
                    value={results.asFound1}
                    onChange={(e) => setResults({ ...results, asFound1: e.target.value })}
                    className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Setpoint 2:</label>
                    <input
                    type="text"
                    value={results.setpoint2}
                    onChange={(e) => setResults({ ...results, setpoint2: e.target.value })}
                    className="form-control"
                    />
                    <label>As Left 2:</label>
                    <input
                    type="text"
                    value={results.asLeft2}
                    onChange={(e) => setResults({ ...results, asLeft2: e.target.value })}
                    className="form-control"
                    />
                    <label>As Found 2:</label>
                    <input
                    type="text"
                    value={results.asFound2}
                    onChange={(e) => setResults({ ...results, asFound2: e.target.value })}
                    className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Setpoint 3:</label>
                    <input
                    type="text"
                    value={results.setpoint3}
                    onChange={(e) => setResults({ ...results, setpoint3: e.target.value })}
                    className="form-control"
                    />
                    <label>As Left 3:</label>
                    <input
                    type="text"
                    value={results.asLeft3}
                    onChange={(e) => setResults({ ...results, asLeft3: e.target.value })}
                    className="form-control"
                    />
                    <label>As Found 3:</label>
                    <input
                    type="text"
                    value={results.asFound3}
                    onChange={(e) => setResults({ ...results, asFound3: e.target.value })}
                    className="form-control"
                    />
                </div>
            </div>
            <br />
             <br />

          <button type="submit" className="btn btn-primary">Submit</button>
          {error && <div className="error">{error}</div>}
        </form>
      );
    };

