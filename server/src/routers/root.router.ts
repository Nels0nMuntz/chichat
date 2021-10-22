import { NextFunction, Router } from "express";
import { ErrorCode, ErrorException } from "../shared";
import AuthRouter from "./auth.router";
import { DialogRouter } from "./dialog.router";
import { MessageRouter } from "./message.router";
import { UserRouter } from "./user.router";


class RootRouter {
    public router: Router;
    private authRouter: AuthRouter;
    private userRouter: UserRouter;
    private dialogRouter: DialogRouter;
    private messageRouter: MessageRouter;

    constructor() {
        this.router = Router();
        this.authRouter = new AuthRouter();
        this.userRouter = new UserRouter();
        this.dialogRouter = new DialogRouter();
        this.messageRouter = new MessageRouter();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.use('/auth', this.authRouter.router);
        this.router.use('/user', this.userRouter.router);
        this.router.use('/dialogs', this.dialogRouter.router);
        this.router.use('/messages', this.messageRouter.router);
        this.router.use('/*', () => { throw new ErrorException(ErrorCode.NOT_FOUND, "Page not found") });
    }
}

export const rootRouter = new RootRouter().router;