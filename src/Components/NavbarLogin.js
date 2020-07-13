import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux'; 


const navbarLogin = () => {
    const roles = useSelector(state => state.user ? state.user.roles : []);
    const [esAdmin, setEsAdmin] = useState(() => roles.includes(2));
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
            {esAdmin?
            <Link to="/Validar-Tutor" className="nav-link">
                        <li><h6 className="link">Validar tutor</h6></li>
            </Link> :
            ""}
        </ul>
    </nav>
    )
}

export default navbarLogin;