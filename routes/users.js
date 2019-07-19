/* const WebSocket = require('ws');

const getUsersWSServer = (server) => {
    const usersWSServer = new WebSocket.Server({server}, {
        path: '/api/v1/users',
        perMessageDeflate: false
    });

    usersWSServer.usersMap = Object.create(null);

    usersWSServer.on('connection', userWS => {
        userWS.on('message', message => {
            console.log('received: %s', JSON.stringify(message));

            switch (message.type) {
                case 'SIGN_IN':
                    const email = message['email-field'];

                    usersWSServer.usersMap[email] = {
                        connection: userWS,
                        name: message['name-field']
                    };
                    break;
                default:
                    break;
            }

            userWS.send(usersMap);
        });
    });

    return null;
};

module.exports = {getUsersWSServer}; */

const express = require('express');

const router = express.Router();
const usersMap = Object.create(null);

usersMap.foo = 'bar';

router.get('/', (req, res) => {
    res.send(usersMap);
});

module.exports = router;
