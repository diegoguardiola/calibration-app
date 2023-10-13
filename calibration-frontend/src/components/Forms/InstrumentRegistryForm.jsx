import { useState } from "react"
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

  return (
    <form className="" onSubmit={handleSubmit}>
        <h3>Create New User</h3>
        <label>Company</label>
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