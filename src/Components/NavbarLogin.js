import React, { useDebugValue } from 'react';
import {Link} from 'react-router-dom';
const navbarLogin = () => {
    return  (
    <nav >
                <ul className="nav">
                    <Link to="/video-llamadas" className="nav-link">
                        <li><h6 className="link">Video llamadas</h6></li>
                    </Link>
                    <Link to="/solicitud" className="nav-link">
                        <li><h6 className="link">Ser tutor</h6></li>
                    </Link>         
                    <Link to="/cupones" className="nav-link">
                        <li><h6 className="link">Mis cupones</h6></li>
                    </Link>  
                    <Link to="/VistaAdministrador" className="nav-link">
                                <li><h6 className="link">Administrador</h6></li>
                    </Link>    
                </ul>
    </nav>
    )
}

export default navbarLogin;