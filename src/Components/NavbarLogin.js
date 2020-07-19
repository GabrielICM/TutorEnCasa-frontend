import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux'; 
import { RolUsuario } from '../util/usuario';

const navbarLogin = () => {
    const roles = useSelector(state => state.user ? state.user.roles : []);
    const [esAdmin] = useState(() => roles.includes(RolUsuario.ADMINISTRADOR));
    const [esTutor] = useState(() => roles.includes(RolUsuario.TUTOR));

    function refreshPage() {
        window.location.reload(false);
      }

    return  (
    <nav >
        <ul className="nav">
            <Link to="/mis-tutorias" className="nav-link">
                <li><h6 className="link">Clases</h6></li>
            </Link>
            {esTutor ?
                '' :
                <Link to="/solicitud" className="nav-link">
                    <li><h6 className="link">Ser tutor</h6></li>
                </Link>
            }
            <Link to="/cupones" className="nav-link">
                <li><h6 className="link">Mis cupones</h6></li>
            </Link>  
            {esAdmin?
            <Link to="/Validar-Tutor" className="nav-link">
                <li><h6 className="link">Validar tutor</h6></li>
            </Link>        
            :
            ""}
            <Link to="/perfil" className="nav-link">
                <li><h6 className="link">Perfil</h6></li>
            </Link> 
            <Link className="nav-link" onClick={refreshPage} >
                <li>
                    <h6 className="link">Salir</h6>
                </li>    
            </Link>
        </ul>
    </nav>
    )
}

export default navbarLogin;