import { Router } from "express";
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
        // TODO add auth check MW
        this.router.post('/create', this.controller.create);
        this.router.put('/update', this.controller.update);
    }

};