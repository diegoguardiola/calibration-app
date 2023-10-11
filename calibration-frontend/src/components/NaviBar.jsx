import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

function Navigation() {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
      }
    

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Home
                </Link>
                <Link className="navbar-brand" to="/calibration">
                    Calibration
                </Link>
                <Link className="navbar-brand" to="/admin">
                    Admin
                </Link>
                <Link className="navbar-brand" to="/instrument-regisrty">
                    Instrument Registry
                </Link>
                <nav>
                    {user && (
                        <div>
                        <span>{user.email}</span>
                        <button onClick={handleClick}>Log out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                        </div>
                    )}
                    </nav>
                        </div>
                </nav>
    );
}

export default Navigation;