import React, { useState } from 'react';
import { Header, Navbar, Body, Footer } from '../../Components';
import { Redirect } from 'react-router-dom';

const nosotros = () => {

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