import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CurrentUser } from '../contexts/CurrentUser';

function Navigation() {
    const navigate = useNavigate();
    const { currentUser } = useContext(CurrentUser);

    let loginActions = (
        <>
            <li className="nav-item">
                <Link className="nav-link" to="/signup">
                    Sign Up
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">
                    Login
                </Link>
            </li>
        </>
    );

    if (currentUser) {
        loginActions = (
            <li className="nav-item">
                Logged in as {currentUser.firstName} {currentUser.lastName}
            </li>
        );
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Home
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/calibration">
                                Calibration
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/po">
                                PO
                            </Link>
                        </li>
                        {loginActions}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
