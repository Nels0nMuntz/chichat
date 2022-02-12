import { IMessageStore } from './message.model';

export type MessageProps = {
    userId: string;
    message: IMessageStore;
    selectMode: boolean;
    enableSelectMode: () => void;
    toggleSelectMessage: (message: IMessageStore) => void;
};