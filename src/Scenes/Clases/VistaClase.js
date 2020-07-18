import React, { useState, useEffect } from 'react';
import './VistaClase.css';
import { Header, Body, Footer, Navbar } from '../../Components';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import useSession from './hooks/useSession';
import useSessionVideoTiles from './hooks/useSessionVideoTiles';
import VideoTile from './VideoTile';
import { TextField, MenuItem, Box } from '@material-ui/core';
import { CallEnd } from '@material-ui/icons';
import api from '../../Servicios/Peticion';
import { Modal } from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';

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
    const token = useSelector(state => state.token);
    const {session, sessionError} = useSession(params['id'], token, params['init'] ? 'new' : 'join');
    const { localVideoTile, remoteVideoTiles } = useSessionVideoTiles(session);
    const audioRef = React.useRef(null);
    const [audioInputs, setAudioInputs] = useState([]);
    const [videoInputs, setVideoInputs] = useState([]);
    const [showVideoEl, setShowVideoEl] = useState(false);
    const [mostrarRating, setMostrarRating] = useState(false);
    const [ratingValue, setRatingValue] = React.useState(1);

    const terminarClase = (e) => {
        e.preventDefault();
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
                session.audioVideo.stopContentShare();
                session.audioVideo.stopLocalVideoTile();
                session.audioVideo.stop();
                history.push('/mis-tutorias');
            });
    }

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

    const joinClass = (e) => {
        e.preventDefault();
        setShowVideoEl(true);
        session.audioVideo.start();
        session.audioVideo.startLocalVideoTile();
    }

    return (
        <div>  
        <Header>
            <Navbar/>
        </Header>
        <Body>
            <audio ref={audioRef} style={{ display: "none" }} />
            <Modal show={mostrarRating} onHide={() => {setMostrarRating(false)}}>
                <Modal.Header closeButton>Califica esta clase</Modal.Header>
                <Modal.Body>
                    <div style={{ textAlign: 'center' }}>
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Rating
                            name="simple-controlled"
                            value={ratingValue}
                            precision={1}
                            onChange={(event, newValue) => {
                                ratingClase(newValue);
                                setRatingValue(newValue);
                            }}
                            />
                        </Box>
                    </div>
                </Modal.Body>
            </Modal>
            {showVideoEl ?
                <div>
                    <div className="videocall">
                    <div className="screen" style={{ minHeight: '200px' }}>
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
                    {remoteVideoTiles.map((tileState) => (
                        <div className="screen">
                            <VideoTile 
                                key={tileState.tileId}
                                onMount={(element) => {
                                    if (session && typeof tileState.tileId === "number")
                                        session.audioVideo.bindVideoElement(tileState.tileId, element);
                                    return () => session.audioVideo.unbindVideoElement(tileState.tileId);
                                }}
                            />
                        </div>
                    ))
                    }
                    </div>
                    <div className="controls">
                        <button className="control" onClick={terminarClase} style={{width: '50px', height:'50px', borderRadius: '50px'}}>
                            <CallEnd color="error" />
                        </button>  
                    </div> 
                    <br/>
                    <br/>
                </div>
                :
                <div>
                    <h1 style={{ textAlign: 'center' }}>Ajustes</h1>
                    <form id='form-devices' onSubmit={joinClass}>
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
                        <button className="btn btn-info">Iniciar</button>
                    </form>
                </div>
            }
        </Body>
        <Footer/>
        </div>
    );
}