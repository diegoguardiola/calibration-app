import { useState } from 'react';


const Calibration = () => {


    const [clientInformation, setClientInformation] = useState({
        clientName: '',
        clientAddress: '',
        clientPhone: '',
        clientEmail: '',
        pointOfContact: '',
    });
    const [equipmentInformation, setEquipmentInformation] = useState({
        calibrationType: '',
        equipmentManufacturer: '',
        equipmentModelNumber: '',
        equipmentSerialNumber: '',
        calibrationToolUsed: '',
        calibrationToolManufacturer: '',
        calibrationToolMN: '',
        calibrationToolSN: ''
    });
    const [inputSets, setInputSets] = useState([{ 
        setpoint: '', 
        asLeft: '', 
        asFound: '' 
    }])
    
    const handleInputChange = (e, index) => {
        const { name, value, id } = e.target;
        if (id.includes("client") || id.includes("point")) {
            setClientInformation({ ...clientInformation, [name]: value });
        } else if (id.includes("equipment") || id.includes("calibration")) {
            setEquipmentInformation({ ...equipmentInformation, [name]: value });
        } else {
            const updatedInputSets = [...inputSets];
            updatedInputSets[index][name] = value;
            setInputSets(updatedInputSets);
        }
    };    

    const handleAddSet = () => {
        setInputSets([...inputSets, { setpoint: '', asLeft: '', asFound: '' }]);
    };
    
    const handleRemoveSet = (index) => {
        const updatedInputSets = [...inputSets];
        updatedInputSets.splice(index, 1);
        setInputSets(updatedInputSets);
    };

    const renderInputSets = () => {
        return inputSets.map((inputSet, index) => (
          <div key={index}>
            <input
              type="text"
              name="setpoint"
              value={inputSet.setpoint}
              onChange={(event) => handleInputChange(event, index)}
              placeholder="Setpoint"
            />
            <input
              type="text"
              name="asLeft"
              value={inputSet.asLeft}
              onChange={(event) => handleInputChange(event, index)}
              placeholder="As Left"
            />
            <input
              type="text"
              name="asFound"
              value={inputSet.asFound}
              onChange={(event) => handleInputChange(event, index)}
              placeholder="As Found"
            />
            {index > 0 && (
              <button type="button" onClick={() => handleRemoveSet(index)}>
                Remove
              </button>
            )}
          </div>
        ));
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here we create an object with all the data we want to submit.
        const data = {
          ...clientInformation,
          ...equipmentInformation,
          ...inputSets[0], // If there are more than one inputSets, you need to loop through them
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
          pointOfContact: '',
        });
        setEquipmentInformation({
        calibrationType: '',
        equipmentManufacturer: '',
        equipmentModelNumber: '',
        equipmentSerialNumber: '',
        calibrationToolUsed: '',
        calibrationToolManufacturer: '',
        calibrationToolMN: '',
        calibrationToolSN: '',
        });
        setInputSets([{ 
            setpoint: '', 
            asLeft: '', 
            asFound: '' 
        }])
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
                <div>
                    <label htmlFor="pointOfContact">Point of Contact:</label>
                    <input
                    type="text"
                    id="pointOfContact"
                    name="pointOfContact"
                    value={clientInformation.pointOfContact}
                    onChange={handleInputChange}
                    required
                    />
                </div>
            </div>
            <br />
            <br />
            <div className='Equipment_Information'>
                <div>
                    <label htmlFor="calibrationType">Calibration Type:</label>
                    <input
                    type="text"
                    id="calibrationType"
                    name="calibrationType"
                    value={equipmentInformation.calibrationType}
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
                    <label htmlFor="calibrationToolUsed">Calibration Tool Used:</label>
                    <input
                    type="text"
                    id="calibrationToolUsed"
                    name="calibrationToolUsed"
                    value={equipmentInformation.calibrationToolUsed}
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
                    value={equipmentInformation.calibrationToolManufacturer}
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
                    value={equipmentInformation.calibrationToolMN}
                    onChange={handleInputChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="calibrationbToolSN">Calibration Tool Serial Number:</label>
                    <input
                    type="text"
                    id="calibrationbToolSN"
                    name="calibrationbToolSN"
                    value={equipmentInformation.calibrationbToolSN}
                    onChange={handleInputChange}
                    required
                    />
                </div>
            </div>
            <br />
            <br />
            <div className='Calibration_Information'>
                {renderInputSets()}
                <button type="button" onClick={handleAddSet}>
                Add
                </button>
            </div>
            <br />
             <br />

          <button type="submit">Submit</button>
        </form>
      );
    };

export default Calibration;
