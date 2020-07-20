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
    const [soliTutor, setSoliTutor] = useState([]);
    const { register, handleSubmit, errors } = useForm();
    const listarTutoresBoton = React.createRef();

    const apiSolicitud = data =>{
        api('GET','/admin/request',data,{ 'access-token': token })
            .then((Respuesta) => {
                if(Respuesta.status == 'success')
                {
                    setSoliTutor(Respuesta.tutors);
                    console.log(soliTutor)
                    setSuccess(true);
                }
                console.log(Respuesta.tutors)
            });
    }
    const apiValidarTutor = (status, id) => {
        api('PUT',`/admin/tutor/${id}/validate`,{status},{ 'access-token': token })
            .then((Respuesta) => {
                if(Respuesta.status == 'success')
                {
                    setSuccess(true);
                    listarTutoresBoton.current.click();
                }
        });
    }

    const apiPeticioncertificado = (id) => {
        api('GET',`/admin/request/${id}/certificate`, {},{ 'access-token': token })
            .then((Respuesta) => {
                Respuesta.blob()
                    .then((data) => {
                        // 2. Create blob link to download
                        const url = window.URL.createObjectURL(new Blob([data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', `certificado.pdf`);
                        document.body.appendChild(link);
                        link.click();
                        link.parentNode.removeChild(link);
                    });
            })
            .catch((e) => {
                //
            });
    }

        const datosTutor = soliTutor.map((solicitud) => (
            <div className="col p-3">
                <div className="card mt-3" style={{width: "18rem"}}>
                    <div className="card-body" key={solicitud.id}>
                        <h5 className="card-title" >{solicitud.user.firstname} {solicitud.user.lastname}</h5>
                        <p className="card-text">Email: {solicitud.user.email}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item" >
                            <input className="btn btn-info" style={{width:"100%"}} type="submit"  value="Certificado" onClick={() => apiPeticioncertificado(solicitud.id)} />
                        </li>
                        <li className="list-group-item">
                            <input className="btn btn-success" style={{width:"100%"}} type="submit" value="Aceptar" onClick={() =>apiValidarTutor(1, solicitud.id)} />   
                        </li>
                        <li className="list-group-item">
                            <input className="btn btn-danger" style={{width:"100%"}} type="submit"value="Rechazar" onClick={()=> apiValidarTutor(0, solicitud.id)} />
                        </li>
                    </ul>
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
                <input className="btn btn-secondary" type="submit" value="Solicitudes" ref={listarTutoresBoton} onClick={apiSolicitud}/>
                {succes? 
                    <div className="row mb-5">
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