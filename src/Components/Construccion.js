import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Construccion = () => {
    const login = useSelector(state => state.login);
    return( 
        <div className="center mt-5">
            <h1>Sitio en construccion...</h1>
            {login ? 
                <Link to={'/mis-tutorias'} style={{ textDecoration: 'none' }} className='btn btn-secondary'>Ir a clases</Link> 
                :
                <Link to={'/inicio-sesion'} style={{ textDecoration: 'none' }} className='btn btn-secondary'>Ir a Iniciar sesion</Link>
            }
        </div>
    )
}

export default Construccion;