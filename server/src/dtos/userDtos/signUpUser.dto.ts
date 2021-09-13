import { isEmptyString } from "../../helpers";
import { IAuthSignUpRequest } from "../../models";


export class SignUpUserDto {

    email: string;
    firstName: string;
    lastName?: string;
    phoneNumber: string;
    password: string;

    constructor(user: IAuthSignUpRequest){
        this.email = user.email;
        this.firstName = user.firstName;
        this.lastName = isEmptyString(user.lastName) ? undefined : user.lastName;
        this.phoneNumber = user.phoneNumber;
        this.password = user.password;
    };
};