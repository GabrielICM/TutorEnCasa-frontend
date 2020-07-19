import React,{useState} from 'react';
import {useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import api from '../../Servicios/Peticion';
import { Header, Navbar, Body, Footer,Alerts} from '../../Components';
import { Redirect } from 'react-router-dom';
import {Modal} from 'react-bootstrap';

export default function solicitudTutor() {
    const logged = useSelector(state => state.login);
    const token = useSelector(state => state.token);
    const { register, handleSubmit, errors } = useForm();
    
    let archivoAdjuntado = true;

    const [text,setText] = useState();
    const [alertShow,setAlertShow] = useState(false);
    const [alertdesign,setAlertdesign] = useState(true);

    if(! logged)
        return <Redirect to="/inicio-sesion" />

    const formOnSubmit = data => {
        console.log(data);
        const files = document.querySelector('[name="file"]').files;
        if(files.length > 0){
            console.log('enviando...')
            const file = files[0];
            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', 0);
            console.log(formData);
            api('POST','/tutor/request', formData, { 'access-token': token })
                .then((res) => {
                    if(res.status == 'failed') {
                        setText((res.error).toString());
                        setAlertdesign(false);
                    }
                    else{
                        setText('Enviado con éxito');
                    }
                    setAlertShow(true);
                });
        }
        else {
            console.log('Error al enviar...')
            setText('Debe ingresar un documento')
            setAlertdesign(false);
            setAlertShow(true);
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
                <div id="FormSolicitud" className="container  border jumbotron rounded shadow mb-2 mt-4 w-30 center bg-white  rounded">  
                    <form className="form" onSubmit={handleSubmit(formOnSubmit)} encType="multipart/form-data">
                        <div>
                        <h1 className="h1 mt-4 mb-4">Solicitud para realizar tutorías</h1>
                        <p>Ingresa tu certificado de alumno regular en formato PDF:</p>
                            <input type="file" name="file" id="customFile" accept="application/pdf"/>
                        </div>
                        <div className="mb-2 mt-4 center">
                            <input className="btn btn-secondary" type="submit" value="Enviar solicitud" name="sbtSolicitud" 
                            ref={register({required: {value:archivoAdjuntado, message: "Debe adjuntar un archivo pdf"}})}/>
                        <div>
                            <Modal show={alertShow} onHide={() => {setAlertShow(false)}}>
                                <Modal.Header closeButton>
                                    <div>
                                        {text}
                                    </div>
                                </Modal.Header> 
                            </Modal>
                        </div>    
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

/*
<Popup
                                modal
                                open={alertShow}
                                closeOnDocumentClick
                                onClose={()=>{setAlertShow(false)}}
                                >
                                {alertdesign?
                                <div className="alert alert-success" style={{width:"100%",height:"100%"}} role="alert">
                                    <h1>{text}</h1>
                                </div>
                                :
                                <div className="alert alert-danger" role="alert">
                                    <h1>{text}</h1>
                                </div>
                                }
                            </Popup>
*/