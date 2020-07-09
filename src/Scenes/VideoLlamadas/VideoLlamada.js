import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Header, Body, Footer, Navbar } from '../../Components';
import { VideoCall } from '../../Servicios/VideoCall';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';



const videoLlamada = () => {

    const [title, setTitle] = useState('Desactivar');
    const botonHerramienta = () =>{
        setTitle('Activar');
    }
    const logged = useSelector(state => state.login);
    if(! logged)
        return <Redirect to="/inicio-sesion"/>

    const token = useSelector(store => {
        console.log(store);
        return (store.token) ? store.token : undefined
    });
    const [videoCall, set ] = useState(new VideoCall());

    const { register, handleSubmit, errors } = useForm();
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

return(
<div>  
    <Header>
        <Navbar/>
    </Header>
    <Body>
        <div className="container upload border jumbotron rounded shadow p-3 mb-5 bg-white rounded">
            <form className="form-group"  onSubmit={handleSubmit(crearSubmit)}>
                <input className="form-control " type="text" name="nombre" id="nombreSala" placeholder="Sala de Video"ref={register({required: true})}/>
                <button type="submit" className="mt-1">Iniciar clase</button>
            </form>
            <form className="form-group" onSubmit={handleSubmit(ingresarSubmit)}>
                <input className="form-control" type="text" id="nombre" placeholder="Sala de Video"/>
                <button type="submit" className="mt-1">Ingresar clase</button>
            </form>
        </div>
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

