import userConnectionService from './user-connection.service'

class CommandsService {
    send(command) {
        userConnectionService.ws.send(JSON.stringify({ command }));
    }
}

export default new CommandsService();
