import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin"

function LoginForm() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const loginSuccess = await login(email, password);
        console.log('Login Success:', loginSuccess); // Debugging line

            navigate('/profile-info');
   
    }
    

    return (
        <main>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-sm-6 form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            required
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="form-control"
                            id="email"
                            name="email"
                        />
                    </div>
                    <div className="col-sm-6 form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            required
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="form-control"
                            id="password"
                            name="password"
                        />
                    </div>
                </div>
                <input className="btn btn-primary" type="submit" value="Login" />
            </form>
        </main>
    )
}

export default LoginForm