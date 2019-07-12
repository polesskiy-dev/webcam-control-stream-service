import React from 'react';
import {getCredentials} from "../../../helpers/auth.helper";

const WS_URL = window.location.origin.replace(/^http/, 'ws') + '/api/v1/webcam-stream';

const configuration = {
    iceServers: [{ url: 'stun:stun2.1.google.com:19302' }]
};

const RoboVideo = () => {
    const videoRef = React.createRef();

    let connection = null;

    // TODO temporary
    const ws = new WebSocket(WS_URL);
    const sendMessage = message => {
        ws.send(JSON.stringify(message))
    };

    const handleLogin = async success => {
        if (success === false) {
            console.warn('login failed');
        } else {
            connection = new RTCPeerConnection(configuration);

            connection.onaddstream = event => {
                videoRef.current.srcObject = event.stream
            };

            connection.onicecandidate = event => {
                console.log('ice candidate event ', event);
                if (event.candidate) {
                    sendMessage({
                        type: 'candidate',
                        candidate: event.candidate
                    })
                }
            }
        }
    };

    const handleOffer = (offer) => {
        connection.setRemoteDescription(new RTCSessionDescription(offer));
        connection.createAnswer(
            answer => {
                connection.setLocalDescription(answer);
                sendMessage({
                    type: 'answer',
                    answer: answer
                })
            },
            error => {
                alert('Error when creating an answer');
                console.error(error)
            }
        )
    };

    ws.onopen = () => {
        console.log(`Connected to signaling server ${WS_URL}`);
        sendMessage({
            type: 'login',
            credentials: getCredentials(),
        })
    };

    ws.onmessage = msg => {
        console.log('Got message', msg.data)

        const data = JSON.parse(msg.data)

        switch (data.type) {
            case 'login':
                handleLogin(data.success);
                break;
            case 'offer':
                handleOffer(data.offer);
                break
        }
    };

    ws.onerror = err => console.error(err);
    ws.onclose = () => console.error('socket closed');

    return (
        <section className="robo-video">
            <video ref={videoRef} />
        </section>
    )
};

export default RoboVideo;
