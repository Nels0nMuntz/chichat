import { Router } from "express";
import AuthRouter from "./authRouter";


class RootRouter {
    public router: Router;
    private authRouter: AuthRouter;

    constructor(){
        this.router = Router();
        this.authRouter = new AuthRouter();
        this.initRoutes();
    }

    private initRoutes(){
        this.router.use('/auth', this.authRouter.router)
    }
}

export const rootRouter = new RootRouter().router;