const WebSocket = require('ws');

const wsClientDataServer = new WebSocket.Server({
    port: 3002,
    path: '/api/v1/users',
});

wsClientDataServer.usersMap = new Map();

// send to all
wsClientDataServer.broadcast = (data) => {
    [...wsClientDataServer.usersMap.keys()].forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

wsClientDataServer.broadcastUsers = () => wsClientDataServer.broadcast(JSON.stringify({ users: [...wsClientDataServer.usersMap.values()] }));

wsClientDataServer.on('connection', socket => {
    wsClientDataServer.usersMap.set(socket, null);

    socket.on('message', message => {
        console.log('received: %s', message);

        try {
            const { type, ...userData} = JSON.parse(message);

            switch (type) {
                case 'SIGN_IN':
                    wsClientDataServer.usersMap.set(socket, userData);
                    // send user list on sign in
                    wsClientDataServer.broadcastUsers();
                    break;
                default:
                    break;
            }
        } catch (e) {
            console.error(e);
        }
    });

    socket.on('close', () => {
        wsClientDataServer.usersMap.delete(socket);

        // send updated user list
        wsClientDataServer.broadcastUsers();
    })
});

module.exports = wsClientDataServer;
