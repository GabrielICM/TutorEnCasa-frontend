import React, { Fragment } from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { NavbarLogin } from './index';
const navbar = () => {
        const login = useSelector(state => state.login)
        return(    
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
                <div className="col-sm-3"></div>
                <div className="col-sm-3">
                    {login ? 
                        <NavbarLogin/>   
                     :   
                        <ul className="nav">
                            <Link to="/registro" className="nav-link"> 
                                <li>Registrarse</li>
                            </Link>  
                            <Link to="inicio-sesion" className="nav-link">
                                <li>Iniciar sesion</li>
                            </Link>        
                        </ul>         
                    }          
            </div>         
            </div>   
        </nav>
        )
}

export default navbar;