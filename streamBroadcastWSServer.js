const WebSocket = require('ws');

const getStreamBroadcastWSServer = (server) => {
    const streamBroadcastWSServer = new WebSocket.Server({server}, {
        path: '/api/v1/webcam-stream',
        perMessageDeflate: false
    });

    streamBroadcastWSServer.connectionCount = 0;

    streamBroadcastWSServer.on('connection', (socket, upgradeReq) => {
        streamBroadcastWSServer.connectionCount++;
        console.log(
            'New WebSocket Connection: ',
            (upgradeReq || socket.upgradeReq).socket.remoteAddress,
            (upgradeReq || socket.upgradeReq).headers['user-agent'],
            '(' + streamBroadcastWSServer.connectionCount + ' total)'
        );
        socket.on('close', () => {
            streamBroadcastWSServer.connectionCount--;
            console.log(
                'Disconnected WebSocket (' + streamBroadcastWSServer.connectionCount + ' total)'
            );
        });
    });

    streamBroadcastWSServer.broadcast = (data) => {
        streamBroadcastWSServer.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    };

    return streamBroadcastWSServer;
};

module.exports = { getStreamBroadcastWSServer };
