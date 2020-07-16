import React,{useState} from 'react';
import { Header, Navbar, Body, Footer } from '../../Components';
import { Redirect } from 'react-router-dom';

const precios = () => {

return(
    <div>
        <Header>
            <Navbar/>
        </Header>
        <Body>Precios</Body>
        <Footer/>
    </div>    
    )
};

export default precios;