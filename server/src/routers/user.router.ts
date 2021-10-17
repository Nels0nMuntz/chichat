import { Router } from "express";
import { checkAuthMW } from "../middlewares";
import { UserController } from "../controllers";


export class UserRouter {

    public router: Router;
    private controller: UserController;

    constructor(){
        this.router = Router();
        this.controller = new UserController();
        this.initRoutes();
    }

    private initRoutes = () => {
        this.router.use("/", checkAuthMW, this.controller.getOne);
    }

};