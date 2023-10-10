import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

function Admin() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(firstName, lastName, email, password, role)
    }
    return (
        <div>
        <form className="admin" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            
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
                value={role} 
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
            <p>Selected Role: {role}</p>

            <button disabled={isLoading}>Add User</button>
            {error && <div className="error">{error}</div>}
        </form>
        </div>
    )
}

export default Admin
