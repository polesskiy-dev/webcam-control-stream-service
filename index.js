const WebSocket = require('ws');

const server = require('./bin/www');

const wsServer = new WebSocket.Server({server}, {path: '/api/v1/webcam-stream'});

const users = {};

wsServer.on('connection', connection = (wsClientConnection) => {
    console.log('client connected ');

    const sendTo = (ws, message) => {
        wsClientConnection.send(JSON.stringify(message));

    wsClientConnection.on('message', message => {
        console.log(`Received message => ${message}`);
        let data = null;

        try {
            data = JSON.parse(message)
        } catch (error) {
            console.error('Invalid JSON', error);
            data = {}
        }

        const {name} = data.credentials;

        switch (data.type) {
            case 'login':
                console.log('User logged', name);

                users[name] = wsClientConnection;
                wsClientConnection.name = name;
                sendTo(wsClientConnection, {type: 'login', success: true});

                break;
        }
    });

    wsClientConnection.on('close', () => {
        console.log('connection closed')
        //handle closing
    });
});
