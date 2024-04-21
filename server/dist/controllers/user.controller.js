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
exports.UserController = void 0;
var shared_1 = require("../shared");
var services_1 = require("../services");
var dtos_1 = require("../dtos");
var UserController = (function () {
    function UserController() {
        var _this = this;
        this.getOne = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var userId, userDocument, userDto, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.user.id;
                        if (!userId) {
                            throw shared_1.ErrorException.BadRequestError("Invalid request data. There is no user ID");
                        }
                        ;
                        return [4, this.service.getUserData(userId)];
                    case 1:
                        userDocument = _a.sent();
                        userDto = new dtos_1.UserResponseDto(userDocument);
                        return [2, res.status(200).json(__assign({}, userDto))];
                    case 2:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3, 3];
                    case 3:
                        ;
                        return [2];
                }
            });
        }); };
        this.update = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var userId, userDto, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.user.id;
                        if (!userId) {
                            throw shared_1.ErrorException.BadRequestError("Invalid request data. There is no user ID");
                        }
                        ;
                        userDto = new dtos_1.UpdateUserDto(req.body, userId);
                        return [4, this.service.updateUserData(userDto)];
                    case 1:
                        _a.sent();
                        return [2, res.status(200).end()];
                    case 2:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3, 3];
                    case 3:
                        ;
                        return [2];
                }
            });
        }); };
        this.search = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var request, userId, _a, query, internal, users, usersDto, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        request = req;
                        userId = req.user.id;
                        _a = request.query, query = _a.query, internal = _a.internal;
                        return [4, this.service.search(userId, query, internal)];
                    case 1:
                        users = _b.sent();
                        usersDto = users.map(function (user) { return new dtos_1.UserResponseDto(user); });
                        return [2, res.status(200).json(usersDto)];
                    case 2:
                        error_3 = _b.sent();
                        next(error_3);
                        return [3, 3];
                    case 3:
                        ;
                        return [2];
                }
            });
        }); };
        this.service = new services_1.UserService();
    }
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map