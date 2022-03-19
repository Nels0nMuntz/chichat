import { Router } from "express";
import { checkAuthMW } from "../middlewares";
import { MessageController } from "../controllers/message.controller";


export class MessageRouter {

    public router: Router;
    private controller: MessageController;

    constructor(){
        this.router = Router();
        this.controller = new MessageController();
        this.initRoutes();
    }

    initRoutes(){
        this.router.post('/create', checkAuthMW, this.controller.create);
        this.router.put('/update', checkAuthMW, this.controller.update);
        this.router.get('/', checkAuthMW, this.controller.getMessages);
    }

};