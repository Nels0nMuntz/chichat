import { Router } from "express";
import AuthRouter from "./authRouter";
import { DialogRouter } from "./dialog.router";
import { MessageRouter } from "./message.router";


class RootRouter {
    public router: Router;
    private authRouter: AuthRouter;
    private dialogRouter: DialogRouter;
    private messageRouter: MessageRouter;

    constructor(){
        this.router = Router();
        this.authRouter = new AuthRouter();
        this.dialogRouter = new DialogRouter();
        this.messageRouter = new MessageRouter();
        this.initRoutes();
    }

    private initRoutes(){
        this.router.use('/auth', this.authRouter.router);
        this.router.use('/dialog', this.dialogRouter.router);
        this.router.use('/message', this.messageRouter.router);
    }
}

export const rootRouter = new RootRouter().router;