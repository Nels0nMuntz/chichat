import { WebSocket } from 'ws';


export class WSClientsMap {

    private _clients: Map<string, WebSocket>;

    get clients(){
        return this._clients;
    }

    constructor(){
        this._clients = new Map();
    }

    getClient = (clientId: string): WebSocket => {
        return this._clients.get(clientId);
    }

    setClient = (clientId: string, socket: WebSocket): void => {
        this._clients.set(clientId, socket);
    }

};