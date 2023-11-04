import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

function Navigation() {
    const navigate = useNavigate(); 
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                {user && (user.role === 'admin' || user.role === 'engineer') && (
                    <Link className="navbar-brand" to="/calibration-list-engineer">
                        Calibration List
                    </Link>
                )}
                {user && (user.role === 'client') && (
                    <Link className="navbar-brand" to="/calibration-list-client">
                        Calibration List
                    </Link>
                )}
                {user && (user.role === 'admin' || user.role === 'engineer') && (
                    <Link className="navbar-brand" to="/calibration-report-entry">
                        Calibration Entry
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
                <Link className="navbar-brand" to="/profile-info">
                    My Profile
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
