import { useState, useEffect } from "react";

const InstrumentRegistryForm = () => {
    const [company, setCompany] = useState('');
    const [equipmentID, setEquipmentID] = useState('');
    const [equipmentManufacturer, setEquipmentManufacturer] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted");
        // Your form submission logic here
    };

    const [clients, setClients] = useState([]);

    useEffect(() => {
        // Fetch the client names from the backend
        fetch('http://localhost:5000/c1_1/user/get-client')
            .then((res) => res.json())
            .then((data) => setClients(data))
            .catch((error) => console.error("Error fetching clients:", error));
    }, []);

    const handleCompanyChange = (e) => {
        const selectedCompany = e.target.value;
        console.log("Selected Company:", selectedCompany);  // Log the selected company
        setCompany(selectedCompany);
    };

    return (
        <form className="" onSubmit={handleSubmit}>
            <h3>Create New User</h3>
            <label>Company</label>
            <select 
                value={company} 
                onChange={handleCompanyChange}  // Use the new handler here
                style={{ width: '300px' }}
            >
                {clients.map((client, index) => (
                    <option key={index} value={client}>
                        {client}
                    </option>
                ))}
            </select>
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
        </form>
    );
};

export default InstrumentRegistryForm;
