import React, { useDebugValue } from 'react';
import {Link} from 'react-router-dom';
const navbarLogin = () => {
    return  (
    <nav >
                <ul className="nav">
                    <Link to="/video-llamadas" className="nav-link">
                        <li>Video llamadas</li>
                    </Link>
                    <Link to="/solicitud" className="nav-link">
                        <li>Solicitud Tutorias</li>
                    </Link>         
                    <Link to="/cupones" className="nav-link">
                        <li>Cupones</li>
                    </Link>   
                </ul>
    </nav>
    )
}

export default navbarLogin;