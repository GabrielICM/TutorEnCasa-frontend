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

class VideoCall {
    constructor(config = {}) {
        this.meetingSession = null;
        this.config = config;
    }

    isReady() {
        return (this.meetingSession != null);
    }

    setOutputAudio(outputAudio) {
        this.meetingSession.audioVideo.bindAudioElement(outputAudio);
    }

    async getUserMedia() {
        const audioInput = this.meetingSession.audioVideo.listAudioInputDevices();
        if(audioInput.length == 0) throw new Error('Necesitas un dispositivo de audio');
        await this.meetingSession.audioVideo.chooseAudioInputDevice(audioInput[0]);

        const videoInput = this.meetingSession.audioVideo.listVideoInputDevices();
        if(videoInput.length == 0) throw new Error('Necesitas un dispositivo de video');
        await this.meetingSession.audioVideo.chooseVideoInputDevice(videoInput[0]);
    }

    startLocalVideo() {
        //
    }
    
    join(id, token) {
        return new Promise((resolve, reject) => {
            Api('POST', '/meeting/join', { id }, { 'access-token': token })
                .then((info) => {
                    this.meetingSession = configureMeetringSession(info.Meeting, info.Attendee);
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
                    resolve();
                })
                .catch((e) => reject(e));
        });
    }
}

export {
    VideoCall
}