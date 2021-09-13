import { Router } from "express";
import { checkAuthMW } from "../middlewares";
import { AuthController } from "../controllers";
import { signInValidationSchema, signUpValidationSchema } from '../helpers';


class AuthRouter {
    public router: Router;
    private controller: AuthController;

    constructor(){
        this.router = Router();
        this.controller = new AuthController();
        this.initRoutes();
    }

    private initRoutes(){
        this.router.post('/signup', signUpValidationSchema, this.controller.signup);
        this.router.post('/signin', signInValidationSchema, this.controller.signin);
        this.router.get('/signout', this.controller.signout);
        this.router.get('/activate/:link', this.controller.activate);
        this.router.get('/refresh', this.controller.refresh);
        this.router.get('/users', checkAuthMW, this.controller.getUsers);
    }
};

export default AuthRouter;