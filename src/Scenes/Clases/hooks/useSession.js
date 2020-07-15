import { useState, useEffect } from "react";
import {
    DefaultMeetingSession,
    ConsoleLogger,
    LogLevel,
    MeetingSessionConfiguration,
    DefaultDeviceController
} from "amazon-chime-sdk-js";

import api from '../../../Servicios/Peticion';

const useSession = (meetingName, token) => {
    const [error, setError] = useState(false);
    const [session, setSession] = useState(null);

    useEffect(() => {
        api('POST', '/meeting/new', { id: meetingName }, { 'access-token': token })
        .then((info) => {
            const logger = new ConsoleLogger("ChimeMeetingLogs", LogLevel.INFO);
            const config = new MeetingSessionConfiguration(
                info.Meeting,
                info.Attendee
            );

            const controller = new DefaultDeviceController(logger);

            const meetingSession = new DefaultMeetingSession(
                config,
                logger,
                controller
            );

            setSession(meetingSession);
        })
        .catch(() => setError(true));
    }, [meetingName, token]);

    return { session, error };
};

export default useSession;
