import { useState } from "react"
//import { useNewUser } from "../../hooks/useNewUser"

const InstrumentRegistryForm = () => {
    const [company, setCompany] = useState('')
    const [equpmentID, setEqupmentID] = useState('')

    const handleSubmit = async (e) => {
        //e.preventDefault()
        console.log()
        //await newUser(company, equpmentID)
    }

  return (
    <form className="" onSubmit={handleSubmit}>
        <h3>Create New User</h3>
        
        <select 
            type="text" 
            value={company} 
            onChange={(e) => setCompany(e.target.value)} 
        >
                <option value="admin">Admin</option>
                <option value="engineer">Engineer</option>
                <option value="client">Client</option>
        </select>
        <label>Equipment ID</label>
        <input 
            type="text" 
            onChange={(e) => setEqupmentID(e.target.value)} 
            value={equpmentID} 
        />
        
    </form>
  )
}

export default InstrumentRegistryForm