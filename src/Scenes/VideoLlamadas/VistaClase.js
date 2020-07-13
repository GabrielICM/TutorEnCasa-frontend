import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Header, Body, Footer, Navbar } from '../../Components';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import api from '../../Servicios/Peticion';
import { useHistory } from "react-router-dom";

export default function VistaClase() {

    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();
    const logged = useSelector(state => state.login);
    const token = useSelector(state => state.token);
    
    if(! logged)
    return <Redirect to="/inicio-sesion" />
    return (
        <div>  
        <Header>
            <Navbar/>
        </Header>
        <Body>
            <div>

            </div>
        </Body>
        <Footer/>
        </div>
    );
  }