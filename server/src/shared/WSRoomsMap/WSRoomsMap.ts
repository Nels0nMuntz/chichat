import { IWSMessage } from "../../models/websocket/common/wsMessage.model";
import { ErrorException } from "../errorHandling/errorException";
import { WSClientsMap } from "../WSClientsMap/WSClientsMap";
import { WSRoomMembersSet } from "../WSRoomMembersSet/WSRoomMembersSet";


export class WSRoomsMap {

    private _rooms: Map<string, WSRoomMembersSet>;

    get rooms(){
        return this._rooms;
    }

    constructor(){
        this._rooms = new Map();
    }

    addRoom = (roomId: string, memberId: string): void => {
        const roomMembersSet = new WSRoomMembersSet();
        roomMembersSet.addMember(memberId)
        this._rooms.set(roomId, roomMembersSet);
    }

    getRoom = (roomId: string): WSRoomMembersSet => {
        return this._rooms.get(roomId);
    }

    hasRoom = (roomId: string): boolean => {
        return this._rooms.has(roomId);
    }

    addRoomMember = (roomId: string, memberId: string): void => {
        const roomMembersSet = this.getRoom(roomId);
        roomMembersSet.addMember(memberId);
        this._rooms.set(roomId, roomMembersSet);
    }

    hasRoomMember = (roomId: string, memberId: string): boolean => {
        const roomMembersSet = this.getRoom(roomId);
        return roomMembersSet.hasMember(memberId);
    }

    broadcast = <T extends object>(roomId: string, clients: WSClientsMap, message: IWSMessage<T>) => {
        const roomMembersMap = this.getRoom(roomId); 
        
        roomMembersMap.members.forEach(memberId => {
            const socket = clients.getClient(memberId);
            if(socket.readyState !== 1){
                throw ErrorException.ServerError("Socket is down");
            };
            socket.send(JSON.stringify(message));
        });
    }

};