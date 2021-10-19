import { CreateMessageRequestDto, MessageResponseDto } from "../../dtos";
import { 
    ICreateMessageRequest, 
    IMessageResponse,
    IWSMessage,
    IWSMessageAction,
    IWSMessageActionData,
    WSMessageTypes,
} from "../../models";


export class WSCreateMessageAction implements IWSMessageAction {
    doAction = async (data: IWSMessageActionData<ICreateMessageRequest>) => {

        const { parsedData, clients, rooms, messageService } = data;
        const { dialogId, createdBy: clientId } = parsedData.payload;
        
        if (rooms.hasRoom(dialogId)) {
            if(!rooms.hasRoomMember(dialogId, clientId)){
                rooms.addRoomMember(dialogId, clientId);
            };
        }else{
            rooms.addRoom(dialogId, clientId);
        };

        try {
            const messageReqDto = new CreateMessageRequestDto(parsedData.payload);
            const messageDocument = await messageService.create(messageReqDto); 
            const messageResDto = new MessageResponseDto(messageDocument);

            const message: IWSMessage<IMessageResponse> = {
                type: WSMessageTypes.CREATE_MESSAGE,
                payload: messageResDto,
            };
    
            rooms.broadcast<IMessageResponse>(dialogId, clients, message);
        } catch (error) {
            throw error;
        }
    }
};