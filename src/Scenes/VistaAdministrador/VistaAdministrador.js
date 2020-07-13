import React, { useState } from 'react';
import { Header, Navbar, Body, Footer } from '../../Components';
import api from '../../Servicios/Peticion';
import {useSelector} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const VistaAdministrador = () => {
    
    const token = useSelector(state => state.token);
    const logged = useSelector(state => state.login);
    const [succes,setSuccess] = useState(false);
    const [soliTutor,setSoliTutor] = useState([]);
    const { register, handleSubmit, errors } = useForm();

    const apiSolicitud = data =>{
        api('GET','/admin/request',data,{ 'access-token': token })
            .then((Respuesta) => {
                setSoliTutor(Respuesta.tutors)
                if(Respuesta.status == 'success')
                {
                setSuccess(true);}
                console.log(Respuesta.tutors)
            });
        }
    const apiValidarTutor = status => {
        api('PUT',`/admin/tutor/${soliTutor.id}/validate`,{status},{ 'access-token': token })
            .then((Respuesta) => {
                setSoliTutor(Respuesta.tutors)
                if(Respuesta.status == 'success')
                {
                setSuccess(true);}
                console.log(Respuesta.tutors)
        });
    }    

    const apiPeticioncertificado = data => {
        api('GET',`/admin/request/${soliTutor.id}/certificate'`,data,{ 'access-token': token })
            .then((Respuesta) => {
                setSoliTutor(Respuesta.tutors)
                if(Respuesta.status == 'success')
                {
                setSuccess(true);}
                console.log(Respuesta.tutors)
        });
    }
    const apiRechazarSolicitud = data => {
        api('GET','/admin/request/${soliTutor.id}/certificate',data,{ 'access-token': token })
            .then((Respuesta) => {
                setSoliTutor(Respuesta.tutors)
                if(Respuesta.status == 'success')
                {
                setSuccess(true);}
                console.log(Respuesta.tutors)
        });
    }
        const datosTutor = soliTutor.map((solicitud) => (
            <div className="card mt-3" style={{width: "18rem"}}>
                <div className="card-body" key={solicitud.id}>
                    <h5 className="card-title" >{solicitud.user.firstname} {solicitud.user.lastname}</h5>
                    <p className="card-text">Email: {solicitud.user.email}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <input type="submit" onClick={apiPeticioncertificado} />
                    </li>
                    <li className="list-group-item">
                        <input type="submit" value="Aceptar" onClick={() =>apiValidarTutor(1)} />   
                    </li>
                    <li className="list-group-item">
                        <input type="submit"value="Rechazar" onClick={()=> apiValidarTutor(0)} />
                    </li>
                </ul>
                <div className="card-body">
                </div>
            </div>
        ))

    if(! logged)
    return <Redirect to="/inicio-sesion" />
    return(
     <div>
        <Header>
            <Navbar/>
         </Header>
        <Body>
            <div>
                <input type="submit" value="Solicitudes" onClick={apiSolicitud}/>
                {succes? 
                    <div>
                        {datosTutor}
                    </div>:
                    ""
                }
            </div>
        </Body>
        <Footer/>
     </div>   
    )
};

export default VistaAdministrador;