import React, { useState, useEffect } from 'react';
import './VistaClase.css';
import { Header, Body, Footer, Navbar } from '../../Components';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import useSession from './hooks/useSession';
import useSessionVideoTiles from './hooks/useSessionVideoTiles';
import VideoTile from './VideoTile';
import { TextField, MenuItem } from '@material-ui/core';
import { CallEnd } from '@material-ui/icons';

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

    const token = useSelector(state => state.token);
    const {session, sessionError} = useSession(params['id'], token, params['init'] ? 'new' : 'join');
    const { localVideoTile, remoteVideoTiles } = useSessionVideoTiles(session);
    const audioRef = React.useRef(null);
    const [audioInputs, setAudioInputs] = useState([]);
    const [videoInputs, setVideoInputs] = useState([]);
    const [showVideoEl, setShowVideoEl] = useState(false);

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
                        <button className="control"><CallEnd color="error" /></button>  
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