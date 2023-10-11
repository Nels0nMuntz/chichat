import { IUpdateUserRequest } from "src/models";

export class UpdateUserDto {
    userId: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;

    constructor(userData: IUpdateUserRequest, userId: string) {
        this.userId = userId;
        this.firstName = userData.firstName || "";
        this.lastName = userData.lastName || "";
        this.avatar = userData.photo || "";
    }
}