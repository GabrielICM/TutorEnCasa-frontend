import React, { useDebugValue } from 'react';
import {Link} from 'react-router-dom';
const navbar = () => {
        return  (
        <nav >
            <div className="row">
                <div className="col-sm-1"></div>
                <div className="col-sm-5">
                    <ul className="nav">
                        <Link to="/" className="nav-link">
                            <li>Inicio</li>
                        </Link>
                        <Link to="/precios" className="nav-link">
                            <li>Precios</li>
                        </Link>         
                        <Link to="/nosotros" className="nav-link">
                            <li>Nosotros</li>
                        </Link>   
                    </ul>
                </div>
                <div className="col-sm-4"></div>
                <div className="col-sm-2">
                    <ul className="nav">
                        <Link to="/registro" className="nav-link"> 
                            <li>Registrarse</li>
                        </Link>  
                        <Link to="inicio-sesion" className="nav-link">
                            <li>Iniciar sesion</li>
                        </Link>           
                    </ul>
                </div>              
            </div>   
        </nav>
        )
}

export default navbar;