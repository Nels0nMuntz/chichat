import { WebSocket } from "ws";

export class WSRoomMembersMap {
    // TODO remove this class
    private _members: Map<string, WebSocket>;

    get members(){
        return this._members;
    }

    constructor(){
        this._members = new Map();
    }

    addMember = (memberId: string, socket: WebSocket): void => {
        this._members.set(memberId, socket);
    }

    hasmMeber = (memberId: string): boolean => {
        return this._members.has(memberId);
    }

};