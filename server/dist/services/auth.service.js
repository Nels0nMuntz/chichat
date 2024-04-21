"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
var bcrypt_1 = require("bcrypt");
var uuid_1 = require("uuid");
var repositories_1 = require("../repositories");
var _1 = require(".");
var dtos_1 = require("../dtos");
var shared_1 = require("../shared");
var AuthService = (function () {
    function AuthService() {
        var _this = this;
        this.signup = function (body) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, firstName, lastName, phoneNumber, password, candidate, hashPassword, activationId, user, tokenPayload, tokens;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = new dtos_1.SignUpUserDto(body), email = _a.email, firstName = _a.firstName, lastName = _a.lastName, phoneNumber = _a.phoneNumber, password = _a.password;
                        return [4, this.repository.findOneByEmail(email)];
                    case 1:
                        candidate = _b.sent();
                        if (candidate) {
                            throw shared_1.ErrorException.BadRequestError("This user is already exists");
                        }
                        ;
                        return [4, (0, bcrypt_1.hash)(password, 3)];
                    case 2:
                        hashPassword = _b.sent();
                        activationId = (0, uuid_1.v4)();
                        return [4, this.repository.createOne({
                                email: email,
                                firstName: firstName,
                                lastName: lastName,
                                phoneNumber: phoneNumber,
                                password: hashPassword,
                                passwordOrigin: password,
                                isActivated: false,
                                activationId: activationId,
                            })];
                    case 3:
                        user = _b.sent();
                        tokenPayload = new dtos_1.TokenPayloadDto(user);
                        tokens = this.tokenService.generateTokens(__assign({}, tokenPayload));
                        return [4, this.tokenService.saveRefreshToken(user.id, tokens.refreshToken)];
                    case 4:
                        _b.sent();
                        return [2, __assign({}, tokens)];
                }
            });
        }); };
        this.signin = function (body) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, password, document, isPassEqual, tokenPayload, tokens;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = new dtos_1.SignInUserDto(body), email = _a.email, password = _a.password;
                        return [4, this.repository.findOneByEmail(email)];
                    case 1:
                        document = _b.sent();
                        if (!document) {
                            throw shared_1.ErrorException.BadRequestError("User does not exists", [{ param: "email", msg: "User does not exists" }]);
                        }
                        return [4, (0, bcrypt_1.compare)(password, document.password)];
                    case 2:
                        isPassEqual = _b.sent();
                        if (!isPassEqual) {
                            throw shared_1.ErrorException.BadRequestError("Paasword is incorrect", [{ param: "password", msg: "Paasword is incorrect" }]);
                        }
                        tokenPayload = new dtos_1.TokenPayloadDto(document);
                        tokens = this.tokenService.generateTokens(__assign({}, tokenPayload));
                        return [4, this.tokenService.saveRefreshToken(document.id, tokens.refreshToken)];
                    case 3:
                        _b.sent();
                        return [2, {
                                user: document,
                                tokens: tokens,
                            }];
                }
            });
        }); };
        this.signout = function (refreshToken) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.tokenService.deleteRefreshToken(refreshToken)];
                    case 1: return [2, _a.sent()];
                }
            });
        }); };
        this.activate = function (activationId) { return __awaiter(_this, void 0, void 0, function () {
            var document;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.repository.findOne({ activationId: activationId })];
                    case 1:
                        document = _a.sent();
                        if (!document)
                            throw new shared_1.ErrorException(shared_1.ErrorCode.INTERNAL_SERVER_ERROR, "Activation link is incorrect");
                        document.isActivated = true;
                        return [4, document.save()];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        }); };
        this.refresh = function (refreshToken) { return __awaiter(_this, void 0, void 0, function () {
            var validatedToken, tokenFromDB, document, tokenPayload, tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!refreshToken) {
                            throw shared_1.ErrorException.UnauthorizedError();
                        }
                        ;
                        validatedToken = this.tokenService.validateRefreshToken(refreshToken);
                        return [4, this.tokenService.getRefreshToken(refreshToken)];
                    case 1:
                        tokenFromDB = _a.sent();
                        if (!validatedToken || !tokenFromDB) {
                            throw shared_1.ErrorException.UnauthorizedError();
                        }
                        ;
                        return [4, this.repository.findById(tokenFromDB.userId)];
                    case 2:
                        document = _a.sent();
                        tokenPayload = new dtos_1.TokenPayloadDto(document);
                        tokens = this.tokenService.generateTokens(__assign({}, tokenPayload));
                        return [4, this.tokenService.saveRefreshToken(document.id, tokens.refreshToken)];
                    case 3:
                        _a.sent();
                        return [2, __assign({}, tokens)];
                }
            });
        }); };
        this.repository = new repositories_1.UserRepository();
        this.mailService = new _1.MailService();
        this.tokenService = new _1.TokenService();
    }
    ;
    return AuthService;
}());
exports.AuthService = AuthService;
;
//# sourceMappingURL=auth.service.js.map