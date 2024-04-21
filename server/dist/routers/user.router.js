"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
var express_1 = require("express");
var middlewares_1 = require("../middlewares");
var controllers_1 = require("../controllers");
var UserRouter = (function () {
    function UserRouter() {
        var _this = this;
        this.initRoutes = function () {
            _this.router.get("/", middlewares_1.checkAuthMW, _this.controller.getOne);
            _this.router.patch("/", middlewares_1.checkAuthMW, _this.controller.update);
            _this.router.get("/search", middlewares_1.checkAuthMW, _this.controller.search);
        };
        this.router = (0, express_1.Router)();
        this.controller = new controllers_1.UserController();
        this.initRoutes();
    }
    return UserRouter;
}());
exports.UserRouter = UserRouter;
;
//# sourceMappingURL=user.router.js.map