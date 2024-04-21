"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
var express_1 = require("express");
var shared_1 = require("../shared");
var auth_router_1 = __importDefault(require("./auth.router"));
var dialog_router_1 = require("./dialog.router");
var message_router_1 = require("./message.router");
var user_router_1 = require("./user.router");
var RootRouter = (function () {
    function RootRouter() {
        this.router = (0, express_1.Router)();
        this.authRouter = new auth_router_1.default();
        this.userRouter = new user_router_1.UserRouter();
        this.dialogRouter = new dialog_router_1.DialogRouter();
        this.messageRouter = new message_router_1.MessageRouter();
        this.initRoutes();
    }
    RootRouter.prototype.initRoutes = function () {
        this.router.use('/auth', this.authRouter.router);
        this.router.use('/user', this.userRouter.router);
        this.router.use('/dialogs', this.dialogRouter.router);
        this.router.use('/messages', this.messageRouter.router);
        this.router.use('/*', function () { throw new shared_1.ErrorException(shared_1.ErrorCode.NOT_FOUND, "Page not found"); });
    };
    return RootRouter;
}());
exports.rootRouter = new RootRouter().router;
//# sourceMappingURL=root.router.js.map