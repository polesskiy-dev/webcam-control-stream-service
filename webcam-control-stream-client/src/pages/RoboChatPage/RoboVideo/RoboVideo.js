import React from 'react';
import {getCredentials} from "../../../helpers/auth.helper";

const WS_URL = window.location.origin.replace(/^http/, 'ws') + '/api/v1/webcam-stream';

const RoboVideo = () => {
    const videoRef = React.createRef();

    // TODO temporary
    const ws = new WebSocket(WS_URL);
    const sendMessage = message => {
        ws.send(JSON.stringify(message))
    };

    ws.onopen = () => {
        console.log(`Connected to signaling server ${WS_URL}`);
        sendMessage({
            type: 'login',
            credentials: getCredentials(),
        })
    };

    /* ws.onmessage = message => {
        console.log(message.data);

        videoRef.current.src = window.URL.createObjectURL(message.data);
    }; */

    ws.onerror = err => {
        console.error(err)
    };

    return (
        <section className="robo-video">
            <img ref={videoRef} />
        </section>
    )
};

export default RoboVideo;
