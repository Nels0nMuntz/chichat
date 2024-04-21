"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRouter = void 0;
var express_1 = require("express");
var middlewares_1 = require("../middlewares");
var message_controller_1 = require("../controllers/message.controller");
var MessageRouter = (function () {
    function MessageRouter() {
        this.router = (0, express_1.Router)();
        this.controller = new message_controller_1.MessageController();
        this.initRoutes();
    }
    MessageRouter.prototype.initRoutes = function () {
        this.router.post('/create', middlewares_1.checkAuthMW, this.controller.create);
        this.router.put('/update', middlewares_1.checkAuthMW, this.controller.update);
        this.router.get('/', middlewares_1.checkAuthMW, this.controller.getMessages);
    };
    return MessageRouter;
}());
exports.MessageRouter = MessageRouter;
;
//# sourceMappingURL=message.router.js.map