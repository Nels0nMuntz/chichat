export interface ISignUpRequest {
    email: string;
    firstName: string;
    lastName?: string;
    phoneNumber: string;
    password: string;
    passwordRepeat: string;
};