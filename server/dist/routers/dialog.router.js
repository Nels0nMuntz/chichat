"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogRouter = void 0;
var express_1 = require("express");
var middlewares_1 = require("../middlewares");
var dialog_controller_1 = require("../controllers/dialog.controller");
var DialogRouter = (function () {
    function DialogRouter() {
        this.router = (0, express_1.Router)();
        this.controller = new dialog_controller_1.DialogController();
        this.initRouts();
    }
    DialogRouter.prototype.initRouts = function () {
        this.router.get('/', middlewares_1.checkAuthMW, this.controller.getOne);
        this.router.get('/all', middlewares_1.checkAuthMW, this.controller.getAll);
        this.router.post('/create', middlewares_1.checkAuthMW, this.controller.create);
    };
    return DialogRouter;
}());
exports.DialogRouter = DialogRouter;
;
//# sourceMappingURL=dialog.router.js.map