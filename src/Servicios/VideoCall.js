import { 
    MeetingSessionConfiguration, 
    ConsoleLogger, 
    LogLevel,
    DefaultDeviceController,
    DefaultMeetingSession
} from 'amazon-chime-sdk-js';
import Api from './Peticion';

function configureMeetringSession(meeting, attendee) {
    const config = new MeetingSessionConfiguration(meeting, attendee);
    const logger = new ConsoleLogger('ChimeMeetingLogs', LogLevel.ERROR);
    const deviceController = new DefaultDeviceController(logger);
    const meetingSession = new DefaultMeetingSession(config, logger, deviceController);
    return meetingSession;
}

class VideoCallDevices {
    constructor() {
        this.videoIsStarted = false;
        this.videoIsEnabled = false;
        this.audioVideo = null;
    }

    async toggleLocalVideo(){
        if (this.videoIsEnabled){
            await this.audioVideo.stopLocalVideoTile();
            this.videoIsEnabled = false;
        } else {
            await this.audioVideo.startLocalVideoTile();
            this.localVideoEnabled = true;
        }
    }

    async getUserMedia() {
        const audioInput = this.audioVideo.listAudioInputDevices();
        if(audioInput.length == 0) throw new Error('Necesitas un dispositivo de audio');
        await this.audioVideo.chooseAudioInputDevice(audioInput[0]);

        const videoInput = this.audioVideo.listVideoInputDevices();
        if(videoInput.length == 0) throw new Error('Necesitas un dispositivo de video');
        await this.audioVideo.chooseVideoInputDevice(videoInput[0]);
    }

    setOutputAudio(outputAudio) {
        this.audioVideo.bindAudioElement(outputAudio);
    }

    setObserver(config) {
        const observer = {
            audioVideoDidStart: () => {},
            videoAvailabilityDidChange: () => {},
            audioVideoDidStartConnecting: () => {},
            audioVideoDidStop: () => {},
            videoTileDidUpdate: () => {},
            videoTileWasRemoved: () => {},
        };
        this.audioVideo.addObserver(observer);
    }
}

class VideoCall {
    constructor(config = {}) {
        this.meetingSession = null;
        this.config = config;
        this.devices = new VideoCallDevices();
    }

    isReady() {
        return (this.meetingSession != null);
    }

    startLocalVideo() {
        this.devices.videoIsStarted = true;
        this.devices.videoIsEnabled = true;
        this.devices.audioVideo.startLocalVideoTile();
    }
    
    join(id, token) {
        return new Promise((resolve, reject) => {
            Api('POST', '/meeting/join', { id }, { 'access-token': token })
                .then((info) => {
                    this.meetingSession = configureMeetringSession(info.Meeting, info.Attendee);
                    this.devices.audioVideo = this.meetingSession.audioVideo;
                    resolve();
                })
                .catch((e) => reject(e));
        });
    }

    create(id, token) {
        return new Promise((resolve, reject) => {
            Api('POST', '/meeting/new', { id }, { 'access-token': token })
                .then((info) => {
                    this.meetingSession = configureMeetringSession(info.Meeting, info.Attendee);
                    this.devices.audioVideo = this.meetingSession.audioVideo;
                    resolve();
                })
                .catch((e) => reject(e));
        });
    }
}

export {
    VideoCall
}