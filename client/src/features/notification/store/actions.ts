import { VariantType } from "notistack";
import { defineAction } from "rd-redux-utils";

import { UniqueId } from "shared";


export const openNotification = defineAction<{ payload: { message: string, variant: VariantType } }>("OPEN_NOTIFICATION");

export const closeNotification = defineAction<{ payload: { key: UniqueId } }>("CLOSE_NOTIFICATION");

export const removeNotification = defineAction<{ payload: { key: UniqueId } }>("REMOVE_NOTIFICATION");