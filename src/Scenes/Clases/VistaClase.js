import React, { useState, useEffect } from 'react';
import './VistaClase.css';
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
import VideoTile from './VideoTile';
import { Grid, TextField, MenuItem } from '@material-ui/core';

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

const mapToSelectOption = (mediaDeviceInfo, idx) => ({
    label: mediaDeviceInfo.label || `device ${idx + 1}`,
    value: mediaDeviceInfo.deviceId,
    original: mediaDeviceInfo
});

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
    const {session, sessionError} = useSession(params['id'], token, params['init'] ? 'new' : 'join');
    const { localVideoTile, remoteVideoTiles } = useSessionVideoTiles(session);
    const audioRef = React.useRef(null);
    const [audioInputs, setAudioInputs] = useState([]);
    const [videoInputs, setVideoInputs] = useState([]);

    useEffect(() => {
        if(session) {
            Promise.all([
                session.audioVideo.listAudioInputDevices(),
                session.audioVideo.listVideoInputDevices(),
            ])
            .then((devices) => {
                const [ audioInputDevices, videoInputDevices ] = devices;
                setAudioInputs(audioInputDevices.length ? audioInputDevices.map(mapToSelectOption) : []);
                setVideoInputs(videoInputDevices.length ? videoInputDevices.map(mapToSelectOption) : []);
                session.audioVideo.bindAudioElement(audioRef.current);
            });

            /*
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
            */
        }
    }, [session]);

    const onChangeSettings = (e) => {
        const deviceType = e.target.name;
        const deviceId = e.target.value;
        const device = [...videoInputs, ...audioInputs].find(d => d.value === deviceId);
        if(device) {
            switch(device.original.kind) {
                case 'audioinput':
                    session.audioVideo.chooseAudioInputDevice(device.original.deviceId);
                    break;
                case 'videoinput':
                    session.audioVideo.chooseVideoInputDevice(device.original);
                    break;
            }
        } else if(deviceId === 'none' && deviceType === 'microphone') {
            session.audioVideo.chooseAudioInputDevice(null);
        }
    }

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
            <div id="videoCall">
                <div className="contact-name">
                    <h3>Partner Name</h3>
                </div>
                <div className="remote-stream">
                    {remoteVideoTiles.map((tileState) => (
                        <VideoTile 
                            key={tileState.tileId}
                            onMount={(element) => {
                                if (session && typeof tileState.tileId === "number")
                                    session.audioVideo.bindVideoElement(tileState.tileId, element);
                                return () => session.audioVideo.unbindVideoElement(tileState.tileId);
                            }}
                        />
                    ))
                    }
                </div>
                <div className="local-stream">
                    {localVideoTile ?
                        <VideoTile 
                            key={localVideoTile.tileId}
                            onMount={(element) => {
                                if (session && typeof localVideoTile.tileId === "number")
                                    session.audioVideo.bindVideoElement(localVideoTile.tileId, element);
                                return () => session.audioVideo.unbindVideoElement(localVideoTile.tileId);
                            }}
                        />
                        :
                        ''
                    }
                </div>
                <div className="controls">
                    <button className="call-end">
                        <i className="material-icons md-48">call_end</i>
                    </button>
                </div>
            </div>
            <audio ref={audioRef} style={{ display: "none" }} />
            <form id='form-devices'>
                <TextField select label='Selecciona la entrada de audio' name='microphone' onChange={onChangeSettings} fullWidth>
                    {
                        audioInputs.map(({label, value}) => {
                            return <MenuItem key={value} value={value}>
                                {label}
                            </MenuItem>;
                        })
                    }
                </TextField>
                <TextField select label='Selecciona la entrada de video' name='camera' onChange={onChangeSettings} fullWidth>
                    {
                        videoInputs.map(({label, value}) => {
                            return <MenuItem key={value} value={value}>
                                {label}
                            </MenuItem>;
                        })
                    }
                </TextField>
            </form>
            <button onClick={() => {
                session.audioVideo.start();
                session.audioVideo.startLocalVideoTile();
            }}>Iniciar</button>
            <br />
            <br />
        </Body>
        <Footer/>
        </div>
    );
  }