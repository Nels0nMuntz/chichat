"use strict";
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
exports.TokenRepository = void 0;
var tokenModel_1 = require("../schemas/tokenModel");
var shared_1 = require("../shared");
var TokenRepository = (function () {
    function TokenRepository() {
        var _this = this;
        this.getOneByUserId = function (userId) { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.model.findOne({ userId: userId })];
                    case 1: return [2, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        console.log({ message: "Can not find refresh token in DB", error: error_1 });
                        throw shared_1.ErrorException.ServerError("Can not find refresh token in DB");
                    case 3: return [2];
                }
            });
        }); };
        this.getOneByToken = function (token) { return __awaiter(_this, void 0, void 0, function () {
            var all, doc, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4, this.model.find()];
                    case 1:
                        all = _a.sent();
                        return [4, this.model.findOne({ refreshToken: token })];
                    case 2:
                        doc = _a.sent();
                        return [4, this.model.findOne({ refreshToken: token })];
                    case 3: return [2, _a.sent()];
                    case 4:
                        error_2 = _a.sent();
                        console.log({ message: "Can not find refresh token in DB", error: error_2 });
                        throw shared_1.ErrorException.ServerError("Can not find refresh token in DB");
                    case 5: return [2];
                }
            });
        }); };
        this.create = function (token) { return __awaiter(_this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.model.create(token)];
                    case 1: return [2, _a.sent()];
                    case 2:
                        error_3 = _a.sent();
                        console.log({ message: "Can not create refresh token in DB", error: error_3 });
                        throw shared_1.ErrorException.ServerError("Can not create refresh token in DB");
                    case 3: return [2];
                }
            });
        }); };
        this.deleteOne = function (token) { return __awaiter(_this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.model.deleteOne({ refreshToken: token })];
                    case 1:
                        _a.sent();
                        return [3, 3];
                    case 2:
                        error_4 = _a.sent();
                        console.log({ message: "Can not delete refresh token in DB", error: error_4 });
                        throw shared_1.ErrorException.ServerError("Can not delete refresh token in DB");
                    case 3: return [2];
                }
            });
        }); };
        this.model = tokenModel_1.tokenModel;
    }
    return TokenRepository;
}());
exports.TokenRepository = TokenRepository;
;
//# sourceMappingURL=token.repository.js.map