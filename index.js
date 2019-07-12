const WebSocket = require('ws');

const server = require('./bin/www');

const wsServer = new WebSocket.Server({server}, {path: '/api/v1/webcam-stream'});

let user = null;
let streamer = null;

const sendTo = (ws, message) => {
    ws.send(JSON.stringify(message));
};

wsServer.on('connection', connection = (wsClientConnection) => {
    console.log('client connected ');

    wsClientConnection.on('message', message => {
        console.log(`Received message => ${message}`);
        let data = null;

        try {
            data = JSON.parse(message)
        } catch (error) {
            console.error('Invalid JSON', error);
            data = {}
        }

        switch (data.type) {
            case 'login':
                const name = data.credentials['name-field'];
                console.log('User logged', name);
                wsClientConnection.name = name;

                if (name === 'streamer') streamer = wsClientConnection;
                else user = wsClientConnection;

                sendTo(wsClientConnection, {type: 'login', success: true});
                break;
            case 'offer':
                if (user) {
                    console.log('Sending offer to: ', user.name);

                    sendTo(user, {
                        type: 'offer',
                        offer: data.offer,
                        username: user.name
                    })
                }
            case 'answer':
                console.log('Sending answer to: ', streamer.name);
                if (streamer) {
                    sendTo(streamer, {
                        type: 'answer',
                        answer: data.answer
                    })
                }
        }
    });

    wsClientConnection.on('close', () => {
        console.log('connection closed')
        //handle closing
    });
});
