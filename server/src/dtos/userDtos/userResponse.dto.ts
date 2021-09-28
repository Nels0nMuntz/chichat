import { IUserDocument } from "../../schemas";
import { IUserResponse } from "../../models";


export class UserResponseDto implements IUserResponse {

    readonly userId: string;
    readonly email: string;
    readonly firstName: string;
    readonly lastName?: string;
    readonly phoneNumber: string;
    readonly avatar?: string;

    constructor(doc: IUserDocument){
        this.userId = doc.id;
        this.email = doc.email;
        this.firstName = doc.firstName;
        this.lastName = doc.lastName;
        this.phoneNumber = doc.phoneNumber;
        this.avatar = doc.avatar;
    }

};