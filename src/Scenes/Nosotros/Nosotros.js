import React, { useState } from 'react';
import { Header, Navbar, Body, Footer, Construccion } from '../../Components';
import { Redirect } from 'react-router-dom';

const nosotros = () => {

    if(true)
    return <Construccion />
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