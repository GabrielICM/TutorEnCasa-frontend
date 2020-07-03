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
        return <Redirect to="/inicio-sesion" />

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
        <form onSubmit={handleSubmit(crearSubmit)}>
            <input type="text" name="nombre" id="nombreSala" placeholder="Sala de Video"ref={register({required: true})}/>
            <button type="submit" >Iniciar clase</button>
        </form>

        <form onSubmit={handleSubmit(ingresarSubmit)}>
            <input type="text" id="nombre" placeholder="Sala de Video"/>
            <button type="submit">Ingresar clase</button>
        </form>

    <button onClick={botonHerramienta}>{title}</button>
    
        <div id="tiles"></div>
        <audio id="audioStream" hidden="hidden"></audio> 
        
</Body>
<Footer/>
</div>
) 
};

export default videoLlamada;

