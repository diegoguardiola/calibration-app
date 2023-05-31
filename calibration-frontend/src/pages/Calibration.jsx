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
        setClientInformation({ ...clientInformation, [e.target.name]: e.target.value });
        setEquipmentInformation({ ...equipmentInformation, [e.target.name]: e.target.value });
        const { name, value } = e.target;
        const updatedInputSets = [...inputSets];
        updatedInputSets[index][name] = value;
        setInputSets(updatedInputSets);
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
              onChange={(event) => handleInputChange(index, event)}
              placeholder="Setpoint"
            />
            <input
              type="text"
              name="asLeft"
              value={inputSet.asLeft}
              onChange={(event) => handleInputChange(index, event)}
              placeholder="As Left"
            />
            <input
              type="text"
              name="asFound"
              value={inputSet.asFound}
              onChange={(event) => handleInputChange(index, event)}
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
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Perform any further processing or submit the form Information
        console.log(clientInformation);
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
      };
    
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
                    type="tel"
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
                    value={clientInformation.calibrationType}
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
                    value={clientInformation.equipmentManufacturer}
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
                    value={clientInformation.equipmentModelNumber}
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
                    value={clientInformation.equipmentSerialNumber}
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
                    value={clientInformation.calibrationToolUsed}
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
                    value={clientInformation.calibrationToolManufacturer}
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
                    value={clientInformation.calibrationToolMN}
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
                    value={clientInformation.calibrationbToolSN}
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
