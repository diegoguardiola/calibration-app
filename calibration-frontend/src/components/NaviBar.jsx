import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import UpdateUserRoleButton from './UpdateRoleButton';

function Navigation() {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Home
                </Link>
                <Link className="navbar-brand" to="/calibration">
                    Calibration
                </Link>
                {/* Conditionally render Admin link */}
                {user && user.role === 'admin' && (
                    <Link className="navbar-brand" to="/signup">
                        Admin
                    </Link>
                )}
                <UpdateUserRoleButton/>
                <nav>
                    {user ? (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    ) : (
                        <div>
                            <Link to="/login">Login</Link>
                        </div>
                    )}
                </nav>
            </div>
        </nav>
    );
}

export default Navigation;
