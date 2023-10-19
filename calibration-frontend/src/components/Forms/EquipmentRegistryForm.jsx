import { useState, useEffect } from "react";

const EquipmentRegistryForm = () => {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState('');
    const [equipmentName, setEquipmentName] = useState('');
    const [equipmentID, setEquipmentID] = useState('');
    const [equipmentManufacturer, setEquipmentManufacturer] = useState('');
    const [equipmentModel, setEquipmentModel] = useState('');
    const [equipmentSerial, setEquipmentSerial] = useState('');
    const [equipmentRange, setEquipmentRange] = useState('');
    const [equipmentUnits, setEquipmentUnits] = useState('');
    const [equipmentDescription, setEquipmentDescription] = useState('');
    const [equipmentLocation, setEquipmentLocation] = useState('');
    const [userId, setUserId] = useState(''); // Add a state for userId


    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = 'http://localhost:5000/c1_1/equipment/add'; 

        const data = {
            //company: selectedClient, 
            equipmentName, 
            equipmentID, 
            equipmentManufacturer, 
            equipmentModelNumber: equipmentModel,
            equipmentSerialNumber: equipmentSerial,
            equipmentRange,
            equipmentUnits,
            equipmentDescription,
            equipmentLocation,
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
    //Retrieves all clients by name 
    useEffect(() => {
        fetch('http://localhost:5000/c1_1/user/get-client')
            .then((res) => res.json())
            .then((data) => {
                setClients(data);
                if (data.length > 0) {
                    setSelectedClient(data[0].company); // Set the initial selected client to the company name of the first client
                    setUserId(data[0]._id); // Set the initial userId to the _id of the first client
                    console.log(userId)
                }
            })
            .catch((error) => console.error("Error fetching clients:", error));
    }, []);

    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="row">
                <h3>Register New Equipment</h3>
                <label>Company</label>
                <select 
                    value={selectedClient} 
                    style={{ width: '300px' }}
                    onChange={(e) => {
                        const selected = clients.find(client => client.company === e.target.value);
                        setSelectedClient(selected.company);
                        setUserId(selected._id); // Set the userId when a client is selected
                    }}
                >
                    {clients.map((client, index) => (
                        <option key={index} value={client.company}>
                            {client.company}
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
                <label>Equipment Range</label>
                <input 
                    type="text" 
                    onChange={(e) => setEquipmentRange(e.target.value)} 
                    value={equipmentRange} 
                />
                <label>Equipment Units</label>
                <input 
                    type="text" 
                    onChange={(e) => setEquipmentUnits(e.target.value)} 
                    value={equipmentUnits} 
                />
                <label>Equipment Description</label>
                <input 
                    type="text" 
                    onChange={(e) => setEquipmentDescription(e.target.value)} 
                    value={equipmentDescription} 
                />
                <label>Equipment Location</label>
                <input 
                    type="text" 
                    onChange={(e) => setEquipmentLocation(e.target.value)} 
                    value={equipmentLocation} 
                />
                <button type="submit">Register Equipment</button>
            </div>
        </form>
    );
};

export default EquipmentRegistryForm ;
