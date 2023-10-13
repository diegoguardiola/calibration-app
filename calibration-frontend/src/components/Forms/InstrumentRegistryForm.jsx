import { useState, useEffect } from "react"
//import { useNewUser } from "../../hooks/useNewUser"

const InstrumentRegistryForm = () => {
    const [company, setCompany] = useState('')
    const [equpmentID, setEqupmentID] = useState('')
    const [equpmentManufacturer, setEqupmentManufacturer] = useState('')

    const handleSubmit = async (e) => {
        //e.preventDefault()
        console.log()
        //await newUser(company, equpmentID)
    }

    const [clients, setClients] = useState([]);

    useEffect(() => {
        // Fetch the client names from the backend
        fetch('http://localhost:5000/c1_1/user/get-client')
            .then((res) => res.json())
            .then((data) => setClients(data))
            .catch((error) => console.error("Error fetching clients:", error));
    }, []);

  return (
    <form className="" onSubmit={handleSubmit}>
        <h3>Create New User</h3>
        <label>Company</label>
            <select 
                value={company} 
                onChange={(e) => setCompany(e.target.value)}
            >
                {clients.map((client) => (
                    <option key={client._id} value={client.name}>
                        {client.name}
                    </option>
                ))}
            </select>
        <input 
            type="text" 
            onChange={(e) => setCompany(e.target.value)} 
            value={company} 
        />
        <label>Equipment ID</label>
        <input 
            type="text" 
            onChange={(e) => setEqupmentID(e.target.value)} 
            value={equpmentID} 
        />
        <label>Equipment Manufacturer</label>
        <input 
            type="text" 
            onChange={(e) => setEqupmentManufacturer(e.target.value)} 
            value={equpmentManufacturer} 
        />
    </form>
  )
}

export default InstrumentRegistryForm