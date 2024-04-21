"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var helpers_1 = require("../helpers");
var AuthRouter = (function () {
    function AuthRouter() {
        this.router = (0, express_1.Router)();
        this.controller = new controllers_1.AuthController();
        this.initRoutes();
    }
    AuthRouter.prototype.initRoutes = function () {
        this.router.post('/signup', helpers_1.signUpValidationSchema, this.controller.signup);
        this.router.post('/signin', helpers_1.signInValidationSchema, this.controller.signin);
        this.router.get('/signout', this.controller.signout);
        this.router.get('/activate/:link', this.controller.activate);
        this.router.get('/refresh', this.controller.refresh);
    };
    return AuthRouter;
}());
;
exports.default = AuthRouter;
//# sourceMappingURL=auth.router.js.map