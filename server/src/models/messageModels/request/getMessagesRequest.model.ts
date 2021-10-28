import { IRequest, UniqueId, IPaginationOptions } from '../../common';


interface IGetMessagesQueryString extends IPaginationOptions {
    dialogId: UniqueId;
};

export interface IGetMessagesRequest extends IRequest<{}, IGetMessagesQueryString> { };