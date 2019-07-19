import React, { useEffect } from 'react';

const WS_URL = window.location.origin.replace(/^http/, 'ws') + '/api/v1/webcam-stream';

console.log('Stream url: ', WS_URL);

const RoboVideo = () => {
    useEffect(() => {
        const videoCanvas = document.getElementById('video-canvas');

        const player = new window.JSMpeg.Player(WS_URL, {canvas: videoCanvas});
    });

    return (
        <section className="robo-video">
            <canvas id="video-canvas"></canvas>
        </section>
    )
};

export default RoboVideo;
