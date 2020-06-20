import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Header, Navbar, Body, Footer } from '../../Components';
import { VideoCall } from '../../Servicios/VideoCall';
import { useForm } from 'react-hook-form';

const videoLlamada = () => {
    const token = useSelector(store => {
        console.log(store);
        return (store.token) ? store.token : undefined
    });
    const [videoCall, set ] = useState(new VideoCall());
    const [IniciarVideo, setIniciarSala] = useState(false);
    const [IngresarVideo, setIngresarSala] = useState(false);

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
                <button type="submit" onClick={() => setIniciarSala(true)}>Iniciar clase</button>
            </form>

            <form onSubmit={handleSubmit(ingresarSubmit)}>
                <input type="text" id="nombre" placeholder="Sala de Video"/>
                <button type="submit" onClick={() => this.setIngresarSala(true)}>Ingresar clase</button>
            </form>
          
            <div id="tiles"></div>
            <audio id="audioStream" hidden="hidden"></audio> 
    </Body>
    <Footer/>
</div>
) 
};

export default videoLlamada;

