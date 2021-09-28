import { Router } from "express";
import { checkAuthMW } from "../middlewares";
import { DialogController } from "../controllers/dialog.controller";


export class DialogRouter {

    public router: Router;
    private controller: DialogController;

    constructor(){
        this.router = Router();
        this.controller = new DialogController();
        this.initRouts();
    }

    initRouts(){
        this.router.get('/all', checkAuthMW, this.controller.getAll);
        this.router.post('/create', this.controller.create);
    }

};