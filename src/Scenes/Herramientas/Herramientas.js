import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {Header, Body, Footer, Navbar } from '../../Components/index';

const herramientas = () => {
    const logged = useSelector(state => state.login);
    if(! logged)
        return <Redirect to="/inicio-sesion" />
    
    return(
     <div>
        <Header>
            <Navbar/>
         </Header>
        <Body>

        </Body>
        <Footer/>
     </div>   
    )
};

export default herramientas;