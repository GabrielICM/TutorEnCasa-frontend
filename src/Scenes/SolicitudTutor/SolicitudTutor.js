import React from 'react';
import {useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import api from '../../Servicios/Peticion';
import { Header, Navbar, Body, Footer,UploadPDF } from '../../Components';
import { Redirect } from 'react-router-dom';


export default function solicitudTutor() {
    const logged = useSelector(state => state.login);
    if(! logged)
        return <Redirect to="/inicio-sesion" />

    const { register, handleSubmit, errors } = useForm();
    const token = useSelector(state => state.token);
    const onSubmit = data => {
        const file = document.querySelector('.custom-file-input').files[0];
        const formData = new FormData();
        formData.append('file', file);
        console.log(formData);
        api('POST','/tutor/request', formData, { 'access-token': token });
    }
    console.log(errors);
    
    return (
        <div>  
            <Header>
                <Navbar/>
            </Header>
            <Body>
                <div className="container">
                    <form className="form" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                        <h1 className="h1 mt-4 mb-4">Solicitud para realizar tutorias</h1>
                        <p>Ingresa tu certificado de alumno regular en PDF:</p>
                            <UploadPDF/>
                    </form>
                </div>
            </Body>
            <Footer/>
    </div>
    ) 
};