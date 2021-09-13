import { IUserDocument } from "../../schemas";

export class TokenPayloadDto {
    email: string;
    id: string;
    isActivated: boolean;

    constructor(user: IUserDocument){
        this.email = user.email;
        this.id = user._id;
        this.isActivated = user.isActivated;
    }
};