import { getCredentials } from '../helpers/auth.helper';

const hostname = new URL(window.location.href).hostname;
const WS_URL = `ws://${hostname}:3002/api/v1/users`;

export const usersListEvents = {
    USERS_LIST_UPDATE: 'users-list-update',
};

class UserConnectionService {
    constructor() {
        this.ws = new WebSocket(WS_URL);

        // TODO separate messages by type
        this.ws.onmessage = (message) => {
            document.dispatchEvent(new CustomEvent(usersListEvents.USERS_LIST_UPDATE, { 'detail': JSON.parse(message.data).users }));
        }
    };

    signIn() {
        const credentials = getCredentials();
        this.ws.send(JSON.stringify({ type: 'SIGN_IN', ...credentials }));
    }
}

export default new UserConnectionService();
