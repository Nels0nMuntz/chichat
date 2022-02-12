import { VariantType } from "notistack";
import { UniqueId } from "shared";

export interface INotification {
    key: UniqueId;
    message: string;
    dismissed: boolean;
    options: {
        variant: VariantType;
    };
};