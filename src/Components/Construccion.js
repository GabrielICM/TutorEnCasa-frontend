import React from 'react';
import { Redirect, Link } from 'react-router-dom';

const Construccion = () => {
    return( 
        <div className="center mt-5">
            <h1>Sitio en construccion...</h1>
            <Link to={'/inicio-sesion'} style={{ textDecoration: 'none' }} className='btn btn-secondary'>Ir a Iniciar sesion</Link>
        </div>
    )
}

export default Construccion;