import { defineAction } from "rd-redux-utils";

export const changeMessageAction = defineAction<{ payload: { value: string } }>("CHANGE_MESSAGE");