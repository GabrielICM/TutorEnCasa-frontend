import { useState, useEffect } from "react";
import {
    DefaultMeetingSession,
    ConsoleLogger,
    LogLevel,
    MeetingSessionConfiguration,
    DefaultDeviceController
} from "amazon-chime-sdk-js";

import api from '../../../Servicios/Peticion';

const useSession = (id, token, newJoin) => {
    const [error, setError] = useState(false);
    const [session, setSession] = useState(null);

    useEffect(() => {
        api('POST', `/meeting/${newJoin}`, { id }, { 'access-token': token })
        .then((info) => {
            const logger = new ConsoleLogger("ChimeMeetingLogs", LogLevel.ERROR);
            const config = new MeetingSessionConfiguration(
                info.joinInfo.Meeting,
                info.joinInfo.Attendee
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
    }, [id, token, newJoin]);

    return { session, error };
};

export default useSession;
