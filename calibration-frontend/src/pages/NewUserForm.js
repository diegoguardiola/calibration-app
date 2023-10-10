import { useState } from "react"
import { useNewUser } from "../hooks/useNewUser"

const NewUser = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const {newUser, error, isLoading} = useNewUser()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await newUser(firstName, lastName, email, password, role)
  }

  return (
    <form className="new-user" onSubmit={handleSubmit}>
        <h3>Create New User</h3>
        
        <label>First Name:</label>
        <input 
            type="text" 
            onChange={(e) => setFirstName(e.target.value)} 
            value={firstName} 
        />
        <label>Last Name:</label>
        <input 
            type="text" 
            onChange={(e) => setLastName(e.target.value)} 
            value={lastName} 
        />
        <label>Email address:</label>
        <input 
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
        />
        <label>Password:</label>
        <input 
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
        />
        <select 
            type="text" 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
        >
                <option value="admin">Admin</option>
                <option value="engineer">Engineer</option>
                <option value="client">Client</option>
        </select>
        <button disabled={isLoading}>Create User</button>
        {error && <div className="error">{error}</div>}
    </form>
  )
}

export default NewUser