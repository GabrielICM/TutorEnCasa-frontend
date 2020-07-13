import React, { useState } from 'react';
import { Header, Navbar, Body, Footer } from '../../Components';
import { Redirect } from 'react-router-dom';

const nosotros = () => {

const [alInicio,setAlInicio] = useState(false);
const ReInicio = () =>{
    setAlInicio(true);
}

if(true)
        return( 
        <div className="center mt-5">
            <h1>Sitio en construccion...</h1>
            <input type="submit" value="Ir al inicio" onClick={ReInicio} />
            {alInicio? <Redirect to="/inicio-sesion" /> : ""}
        </div>
        )
return(
    <div>  
        <Header>
            <Navbar/>
         </Header>
         <Body>Nosotros</Body>
         <Footer/>
    </div>
    ) 
};

export default nosotros;