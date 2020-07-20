import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Header, Body, Footer, Navbar } from '../../Components';
import { VideoCall } from '../../Servicios/VideoCall';
import { useForm } from 'react-hook-form';
import { Redirect,Link } from 'react-router-dom';

import api from '../../Servicios/Peticion';
import HistoryStatusClassStatus, { showClassStatus } from '../../util/clases';
import { RolUsuario } from '../../util/usuario';

const videoLlamada = () => {
    const logged = useSelector(state => state.login);
    if(! logged)
        return <Redirect to="/inicio-sesion"/>

    const [title, setTitle] = useState('Desactivar');
    const [tutorias, setTutorias] = useState([]);
    const [videoCall, set ] = useState(new VideoCall());
    const [showTutorias, setShowTutorias ] = useState(false);
    const roles = useSelector(state => state.user.roles);
    const { register, handleSubmit, errors } = useForm();

    const botonHerramienta = () =>{
        setTitle('Activar');
    }
    
    const token = useSelector(store => {
        return (store.token) ? store.token : undefined
    });

    const crearSubmit = data => {
        console.log(data);
        videoCall.create(data.nombre, token)
            .then(() => {
                videoCall.getUserMedia();
                videoCall.setOutputAudio(document.querySelector('#audioStream'));
            }).catch((e) => console.log(e));
    };

    const ingresarSubmit = data => {
        console.log(data);
        videoCall.join(data.nombre, token)
            .then(() => {
                videoCall.getUserMedia();
                videoCall.setOutputAudio(document.querySelector('#audioStream'));
            }).catch((e) => console.log(e));
    };
    
    const tutoriasM = () => {
        setShowTutorias(true);
    }

    const listarClases = datos =>{
        api('GET','/class',datos,{ 'access-token': token })
        .then((res) =>{
            if(res.status == 'success'){
                setTutorias( res.classes);
                setShowTutorias(true);
            }
            else{
                alert(res.error)
            }
        });
    }

    const listaClases = tutorias.map((clase) => {
        return (
            <div key={clase.id} className="card mt-3 mb-5">
                <div className="card-header" >
                    Tutor: {clase.firstname} {clase.lastname}
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <p>Duración de la clase: {clase.minutes} </p>
                        <p>Valor de la clase por hora: {clase.price_hour}</p>
                        
                    </blockquote>
                </div>
            

                {roles.includes(RolUsuario.TUTOR)
                    ?
                    <div>
                        <Link to={`/clase?id=${clase.id}&init`} style={{ textDecoration: 'none', width: "100%"}} className='btn btn-secondary mb-1'>Iniciar clase</Link> 
                        <br/>
                        <Link to={`/clase?id=${clase.id}`} style={{ textDecoration: 'none',width: "100%" }} className='btn btn-secondary'>Entrar a la clase</Link> 
                    </div>

                    :
                    <Link to={`/clase?id=${clase.id}`} style={{ textDecoration: 'none',width: "100%" }} className='btn btn-secondary'>Entrar a la clase</Link> 
                }
            </div>
        );
    });

return(
<div>  
    <Header>
        <Navbar/>
    </Header>
    <Body>
        <div>
            <div className="container upload border jumbotron rounded shadow p-3 mb-5 bg-white rounded">
                <div className="center">
                    <input className="btn btn-secondary" type="submit" value="Mis Clases" onClick={listarClases} />
                </div>
            </div>
        </div>
        {tutorias?
            <div>
                {listaClases}
            </div>
            :
            ""
        }
</Body>
<Footer/>
</div>
) 
};

export default videoLlamada;


//clase.status == HistoryStatusClassStatus.PAY 
//<p>Estado: {showClassStatus(clase.status)}</p>