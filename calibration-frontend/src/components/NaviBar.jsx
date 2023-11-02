import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

function Navigation() {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
            {user && (user.role === 'admin' || user.role === 'engineer') && (
                    <Link className="navbar-brand" to="/home-engineer">
                        Home
                    </Link>
                )}
                {user && (user.role === 'admin' || user.role === 'engineer') && (
                    <Link className="navbar-brand" to="/calibration-report-entry">
                        Calibration
                    </Link>
                )}
                {user && user.role === 'admin' && (
                    <Link className="navbar-brand" to="/admin">
                        Admin
                    </Link>
                )}
                {user && (user.role === 'admin' || user.role === 'engineer') && (
                    <Link className="navbar-brand" to="/equipment-registry">
                        Equipment Registry
                    </Link>
                )}
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
