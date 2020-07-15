import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Header, Body, Footer, Navbar } from '../../Components';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import api from '../../Servicios/Peticion';
import { useHistory } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import useSession from './hooks/useSession';
import useSessionVideoTiles from './hooks/useSessionVideoTiles';

const getParams = function () {
	let params = {};
	const parser = document.createElement('a');
	parser.href = window.location.href;
	const query = parser.search.substring(1);
	const vars = query.split('&');
	for (let i = 0; i < vars.length; i++) {
		const pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};

export default function VistaClase() {
    const params = getParams();
    const logged = useSelector(state => state.login);

    if(! params['id'])
        return <Redirect to="/mis-tutorias" />
    if(! logged)
        return <Redirect to="/inicio-sesion" />

    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();
    const token = useSelector(state => state.token);
    const [mostrarRating, setMostrarRating] = useState(false);
    const [value, setValue] = React.useState(1);
    const {session, sessionError} = useSession('Test', token);
    const videoTiles = useSessionVideoTiles(session);
    const audioRef = React.useRef(null);
    const idClase = params['id'];

    useEffect(() => {
        if(session) {
            Promise.all([
                session.audioVideo
                    .listAudioInputDevices()
                    .then((devices) => {
                        if(devices.length == 0)
                            return alert('No posees dispositivos de audio');
                        session.audioVideo.chooseAudioInputDevice(devices[0]);
                    }),
                session.audioVideo
                    .listVideoInputDevices()
                    .then((devices) => {
                        if(devices.length == 0)
                            return alert('No posees dispositivos de video');
                        session.audioVideo.chooseVideoInputDevice(devices[0]);
                    }),
            ])
            .then(() => {
                session.audioVideo.start();
                session.audioVideo.startLocalVideoTile();
                session.audioVideo.bindAudioElement(audioRef.current);
            });
        }
    }, [session]);

    const terminarClase = () =>{
        const id = params['id'];
        api('PUT',`/class/${id}/end`,{},{ 'access-token': token }).then((res)=>{
            if(res.status == 'success'){
                setMostrarRating(true);
            }
            else{
                alert(res.errors)
            }   
        });

    }

    const ratingClase = (value) =>{
        const id = params['id'];
        api('POST',`/class/${id}/rating`, { value },{ 'access-token': token })
            .then((res) => {
                alert('¡Valoracion enviada!')
                history.push('/mis-tutorias');
            });
    }

    return (
        <div>  
        <Header>
            <Navbar/>
        </Header>
        <Body>
            <div className="center container upload border jumbotron rounded shadow p-3 mb-5 bg-white rounded">
                <input type="submit" value="Terminar clase" onClick={terminarClase} />
                {mostrarRating?
                    <div>
                    <Box component="fieldset" mb={3} borderColor="transparent">
                        <Typography component="legend">Valorar:</Typography>
                        <Rating
                        name="simple-controlled"
                        value={value}
                        precision={1}
                        onChange={(event, newValue) => {
                            ratingClase(newValue);
                            setValue(newValue);
                        }}
                        />
                    </Box>
                    </div>
                    :
                    ""
                }
            </div>
            {videoTiles.map((tileState) => (
                <video 
                    key={tileState.tileId}
                    onMount={(element) => {
                        if (session && typeof tileState.tileId === "number")
                            session.audioVideo.bindVideoElement(tileState.tileId, element);
                        return () => session.audioVideo.unbindVideoElement(tileState.tileId);
                    }}>
                </video>
            ))
            }
            <audio ref={audioRef} style={{ display: "none" }} />
        </Body>
        <Footer/>
        </div>
    );
  }