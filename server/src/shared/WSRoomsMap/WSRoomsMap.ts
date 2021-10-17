import { WebSocket } from "ws";
import { IWSMessage } from "../models/WSMessageManager/WSMessageManager";

class RoomMembersMap {

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

export class WSRoomsMap {

    private _rooms: Map<string, RoomMembersMap>;

    get rooms(){
        return this._rooms;
    }

    constructor(){
        this._rooms = new Map();
    }

    addRoom = (roomId: string, memberId: string, socket: WebSocket): void => {
        const roomMembersMap = new RoomMembersMap();
        roomMembersMap.addMember(memberId, socket)
        this._rooms.set(roomId, roomMembersMap);
    }

    getRoom = (roomId: string): RoomMembersMap => {
        return this._rooms.get(roomId);
    }

    hasRoom = (roomId: string): boolean => {
        return this._rooms.has(roomId);
    }

    addRoomMember = (roomId: string, memberId: string, socket: WebSocket): void => {
        const roomMembersMap = this.getRoom(roomId);
        roomMembersMap.addMember(memberId, socket);
        this._rooms.set(roomId, roomMembersMap);
    }

    hasRoomMember = (roomId: string, memberId: string): boolean => {
        const roomMembersMap = this.getRoom(roomId);
        return roomMembersMap.hasmMeber(memberId);
    }

    broadcast = <T extends object>(roomId: string, message: IWSMessage<T>) => {
        const roomMembersMap = this.getRoom(roomId); 
        roomMembersMap.members.forEach(socket => socket.send(JSON.stringify(message)));
    }

};