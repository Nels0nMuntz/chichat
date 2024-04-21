"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthMW = void 0;
var shared_1 = require("../shared");
var services_1 = require("../services");
var tokenService = new services_1.TokenService();
var checkAuthMW = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            throw shared_1.ErrorException.UnauthorizedError();
        }
        ;
        var accessToken = authorizationHeader.split(" ")[1];
        if (!accessToken) {
            throw shared_1.ErrorException.UnauthorizedError();
        }
        ;
        var payload = tokenService.validateAccessToken(accessToken);
        if (!payload) {
            throw shared_1.ErrorException.UnauthorizedError();
        }
        ;
        req.user = payload;
        next();
    }
    catch (error) {
        next(shared_1.ErrorException.UnauthorizedError());
    }
    ;
};
exports.checkAuthMW = checkAuthMW;
//# sourceMappingURL=checkAuthMW.js.map