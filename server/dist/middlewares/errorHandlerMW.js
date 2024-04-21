"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMW = void 0;
var shared_1 = require("../shared");
var errorHandlerMW = function (err, req, res, next) {
    if (err instanceof shared_1.ErrorException) {
        return res.status(err.status).json({ error: err });
    }
    else {
        return res.status(500).send({ code: shared_1.ErrorCode.UNKNOWN_ERROR, status: 500, error: err });
    }
};
exports.errorHandlerMW = errorHandlerMW;
//# sourceMappingURL=errorHandlerMW.js.map