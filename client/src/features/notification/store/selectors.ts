import { AppState } from "app-state";

export const selectNotifications = (state: AppState) => state.notification.notifications;