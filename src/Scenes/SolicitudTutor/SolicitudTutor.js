import React from 'react';
import {useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import api from '../../Servicios/Peticion';
import { Header, Navbar, Body, Footer,UploadPDF } from '../../Components';
import { Redirect } from 'react-router-dom';


export default function solicitudTutor() {
    const logged = useSelector(state => state.login);
    const { register, handleSubmit, errors } = useForm();
    const token = useSelector(state => state.token);
    let archivoAdjuntado = true;

    if(! logged)
        return <Redirect to="/inicio-sesion" />

    const onSubmit = data => {
        if(data.file){
        const file = document.querySelector('.custom-file-input').files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', 0);
        console.log(formData);
        api('POST','/tutor/request', formData, { 'access-token': token });
    }else{
        return archivoAdjuntado;
    }
    }
    console.log(errors);
    
    return (
        <div>  
            <Header>
                <Navbar/>
            </Header>
            <Body>
                <div id="FormSolicitud" className="container mb-2 mt-4 center">
                    <form className="form" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                        <div>
                        <h1 className="h1 mt-4 mb-4">Solicitud para realizar tutorias</h1>
                        <p>Ingresa tu certificado de alumno regular en formato PDF:</p>
                            <UploadPDF/>
                        </div>
                        <div className="mb-2 mt-4 center">
                            <input type="submit" value="Enviar solicitud" name="sbtSolicitud" ref={register({required: {value:archivoAdjuntado, message: "Debe adjuntar un archivo pdf"}})} />
                        </div>
                        <span className="text-danger text-small d-block mb-2">
                            {errors.sbtSolicitud && errors.sbtSolicitud.message}
                        </span>
                    </form>
                </div>
            </Body>
            <Footer/>
    </div>
    ) 
};