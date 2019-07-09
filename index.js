const WebSocket = require('ws');

const server = require('./bin/www');

const wsServer = new WebSocket.Server({ server }, { path: '/api/v1/webcam-stream' });

wsServer.on('connection', function connection(wsClientConnection) {
    console.log('client connected ');

    wsClientConnection.on('message', function incoming(data) {
        console.log('message received');

        wsServer.clients.forEach(function each(client) {
            if (client !== wsClientConnection && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
});
