import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Header, Body, Footer, Navbar } from '../../Components';
import { VideoCall } from '../../Servicios/VideoCall';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const videoLlamada = () => {

    const [value, setValue] = React.useState(1);
    const [title, setTitle] = useState('Desactivar');
    const [videoCall, set ] = useState(new VideoCall());
    const { register, handleSubmit, errors } = useForm();

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
                <input className="form-control " type="text" name="nombre" id="nombreSala" placeholder="Sala de Video"/>
                <input type="submit" value="Iniciar clase" className="mt-1"/>
            </form>
            <form className="form-group" onSubmit={handleSubmit(ingresarSubmit)}>
                <input className="form-control" type="text" id="nombre" placeholder="Sala de Video"/>
                <input type="submit" value="Ingresar clase" className="mt-1"/>
            </form>
            <div>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Rating:</Typography>
                <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                />
            </Box>
    </div>
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

