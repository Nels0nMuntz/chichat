import { IUser } from "shared";

export const getUserFullname = (user: IUser): string => {
    return user.firstName + (user.lastName && ` ${user.lastName}`);
};