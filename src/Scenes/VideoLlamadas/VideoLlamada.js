import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Header, Body, Footer, Navbar } from '../../Components';
import { VideoCall } from '../../Servicios/VideoCall';
import { useForm } from 'react-hook-form';
import { Redirect,Link } from 'react-router-dom';

import api from '../../Servicios/Peticion';
import HistoryStatusClassStatus, { showClassStatus } from '../../util/clases';

const videoLlamada = () => {

    
    const [title, setTitle] = useState('Desactivar');
    const [tutorias, setTutorias] = useState([]);
    const [videoCall, set ] = useState(new VideoCall());
    const [showTutorias, setShowTutorias ] = useState(false);

    const { register, handleSubmit, errors } = useForm();

    const botonHerramienta = () =>{
        setTitle('Activar');
    }
    const logged = useSelector(state => state.login);
    if(! logged)
        return <Redirect to="/inicio-sesion"/>

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
                alert(res.errors)
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
                        <p>Duracion de la clase: {clase.minutes} </p>
                        <p>Valor de la clase por hora: {clase.price_hour}</p>
                        
                    </blockquote>
                </div>
                {true
                    ?
                    <Link to={`/clase?id=${clase.id}`} style={{ textDecoration: 'none' }} className='btn btn-secondary'>Entrar a la clase</Link> 
                    :
                    ''
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
            <form className="form-group"  onSubmit={handleSubmit(crearSubmit)}>
                <input className="form-control " type="text" name="nombre" disabled={true}  id="nombreSala" placeholder="Sala de Video"/>
                <input type="submit" value="Iniciar clase" disabled={true} className="mt-1"/>
            </form>
            <form className="form-group" onSubmit={handleSubmit(ingresarSubmit)}>
                <input className="form-control" type="text" id="nombre" disabled={true} placeholder="Sala de Video"/>
                <input type="submit" value="Ingresar clase" disabled={true} className="mt-1"/>
            </form>
            
                    <input type="submit" value="Mis Clases" onClick={listarClases} />
                </div>
            </div>
        {tutorias?
                    <div>
                        {listaClases}
                    </div>
                    :
                    ""    
                }
        {false?
        <div>
            <button onClick={botonHerramienta}>{title}</button>
            <div id="tiles"></div>
            <audio id="audioStream" hidden="hidden"></audio> 
        </div> 
        
        :""
        }
</Body>
<Footer/>
</div>
) 
};

export default videoLlamada;


//clase.status == HistoryStatusClassStatus.PAY 
//<p>Estado: {showClassStatus(clase.status)}</p>