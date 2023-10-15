import { useState, useEffect } from "react";

const InstrumentRegistryForm = () => {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState('');
    const [equipmentName, setEquipmentName] = useState('');
    const [equipmentID, setEquipmentID] = useState('');
    const [equipmentManufacturer, setEquipmentManufacturer] = useState('');
    const [equipmentModel, setEquipmentModel] = useState('');
    const [equipmentSerial, setEquipmentSerial] = useState('');
    const [userId, setUserId] = useState(''); // Add a state for userId


    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = 'http://localhost:5000/c1_1/instruments/add'; 

        const data = {
            company: selectedClient, 
            equipmentName, 
            equipmentID, 
            equipmentManufacturer, 
            equipmentModelNumber: equipmentModel,
            equipmentSerialNumber: equipmentSerial,
            userId  // Include userId in the data sent to the backend
        };
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw err; });
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    useEffect(() => {
        fetch('http://localhost:5000/c1_1/user/get-client')
            .then((res) => res.json())
            .then((data) => {
                setClients(data);
                if (data.length > 0) {
                    setSelectedClient(data[0]);
                }
            })
            .catch((error) => console.error("Error fetching clients:", error));
    }, []);

    return (
        <form className="" onSubmit={handleSubmit}>
            <h3>Register New Instrument</h3>
            <label>Company</label>
            <select 
                value={selectedClient} 
                style={{ width: '300px' }}
                onChange={(e) => setSelectedClient(e.target.value)} 
            >
                {clients.map((client, index) => (
                    <option key={index} value={client}>
                        {client}
                    </option>
                ))}
            </select>
            <label>Equipment Name</label>
            <input 
                type="text" 
                onChange={(e) => setEquipmentName(e.target.value)} 
                value={equipmentName} 
            />
            <label>Equipment ID</label>
            <input 
                type="text" 
                onChange={(e) => setEquipmentID(e.target.value)} 
                value={equipmentID} 
            />
            <label>Equipment Manufacturer</label>
            <input 
                type="text" 
                onChange={(e) => setEquipmentManufacturer(e.target.value)} 
                value={equipmentManufacturer} 
            />
            <label>Equipment Model Number</label>
            <input 
                type="text" 
                onChange={(e) => setEquipmentModel(e.target.value)} 
                value={equipmentModel} 
            />
            <label>Equipment Serial Number</label>
            <input 
                type="text" 
                onChange={(e) => setEquipmentSerial(e.target.value)} 
                value={equipmentSerial} 
            />
            <button type="submit">Register Instrument</button>
        </form>
    );
};

export default InstrumentRegistryForm;
