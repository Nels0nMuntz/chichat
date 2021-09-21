import { ErrorCode } from "./errorCode";


export class ErrorException extends Error {
    public code: string;
    public status: number;
    public message: string;
    public metaData: any;

    constructor(code: ErrorCode, message: string, metaData?: any){
        super()
        Object.setPrototypeOf(this, new.target.prototype);
        this.code = code;
        this.metaData = metaData;
        this.message = message;
        switch (code) {
            case ErrorCode.BAD_REQUEST:
                this.status = 400;
                break;
            case ErrorCode.UNAUTORIEZED:
                this.status = 401;
                break;        
            case ErrorCode.NOT_FOUND:
                this.status = 404;
                break;        
            default:
                this.status = 500;
                break;
        }
    };

    public static UnauthorizedError(){
        return new ErrorException(ErrorCode.UNAUTORIEZED, "User is not authorized");
    }

    public static BadRequestError(message: string, metaData?: any){
        return new ErrorException(ErrorCode.BAD_REQUEST, message, metaData);
    }

    public static ServerError(message: string){
        return new ErrorException(ErrorCode.INTERNAL_SERVER_ERROR, message);
    }
};