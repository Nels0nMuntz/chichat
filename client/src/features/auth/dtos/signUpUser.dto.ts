import { isEmptyString } from "shared";
import { ISignUpFormValues, ISignUpRequest } from "../models";

export class SignUpUserDto implements ISignUpRequest {
    email: string;
    firstName: string;
    lastName?: string;
    phoneNumber: string;
    password: string;
    passwordRepeat: string;
    constructor(user: ISignUpFormValues){
        this.email = user.email;
        this.firstName = user.firstName;
        this.lastName = isEmptyString(user.lastName) ? undefined : user.lastName;
        this.phoneNumber = user.phoneNumber.match(/\d/g)?.join("") || "";
        this.password = user.password;
        this.passwordRepeat = user.passwordRepeat;
    };
};