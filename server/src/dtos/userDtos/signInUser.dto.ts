import { IAuthSignInRequest } from "../../models";

export class SignInUserDto {
    email: string;
    password: string;
    constructor(user: IAuthSignInRequest){
        this.email = user.email;
        this.password = user.password;
    }
}