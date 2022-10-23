import React from 'react'
import { useLocation, Link } from 'react-router-dom';
import "../Styles/Navbar.css"

const Navbar = () => {
      let location = useLocation();
    return (
        <>
            <nav className="navbar bg-dark navbar-dark navbar-expand-lg " id='navbar'>
                <div className="container-fluid">
                    <Link className="navbar-brand text-light" id="onLarge" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarContent">
                        <ul className="navbar-nav me-auto  mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname ===  "/" ? "active" : ""}`} to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname ===  "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                            {/* <li className="nav-item">
                                <NavLink className="nav-link text-light" to="/about">About</NavLink>
                            </li> */}
                        </ul>
                        <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar