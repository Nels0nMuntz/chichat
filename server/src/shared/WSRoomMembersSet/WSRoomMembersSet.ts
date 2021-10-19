export class WSRoomMembersSet {

    private _members: Set<string>;

    get members(){
        return this._members;
    }

    constructor(){
        this._members = new Set();
    }

    addMember = (memberId: string): void => {
        this._members.add(memberId)
    }

    hasMember = (memberId: string): boolean => {
        return this._members.has(memberId);
    }

};