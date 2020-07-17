import React, { useEffect, FunctionComponent, useState } from "react";

const VideoTile = ({ isSpeaking = false, onMount }) => {
    const [videoRef, setVideoRef] = useState(null);

    useEffect(() => {
        if (videoRef) {
            return onMount(videoRef);
        }
    }, [videoRef, onMount]);

    return (
        <video
            ref={setVideoRef}
            style={{
                border: isSpeaking ? "green 2px solid" : "none",
                width: '100%'
            }}
        />
    );
};

export default VideoTile;
