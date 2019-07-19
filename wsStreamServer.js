const WebSocket = require('ws');

const getWSStreamServer = (server) => {
    const wsServer = new WebSocket.Server({server}, {
        path: '/api/v1/webcam-stream',
        perMessageDeflate: false
    });

    wsServer.connectionCount = 0;

    wsServer.on('connection', (socket, upgradeReq) => {
        wsServer.connectionCount++;

        console.log(
            'New WebSocket Connection: ',
            (upgradeReq || socket.upgradeReq).socket.remoteAddress,
            (upgradeReq || socket.upgradeReq).headers['user-agent'],
            '(' + wsServer.connectionCount + ' total)'
        );

        socket.on('close', () => {
            wsServer.connectionCount--;
            console.log(
                'Disconnected WebSocket (' + wsServer.connectionCount + ' total)'
            );
        });
    });

    wsServer.broadcast = (data) => {
        wsServer.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    };

    return wsServer;
};

module.exports = { getWSStreamServer };
