"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.TokenService = void 0;
var jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
var repositories_1 = require("../repositories");
var TokenService = (function () {
    function TokenService() {
        var _this = this;
        this.generateTokens = function (payload) {
            var _a = process.env, JWT_ACCESS_SECRET = _a.JWT_ACCESS_SECRET, JWT_REFRESH_SECRET = _a.JWT_REFRESH_SECRET, JWT_ACCESS_MAX_AGE = _a.JWT_ACCESS_MAX_AGE, JWT_REFRESH_MAX_AGE = _a.JWT_REFRESH_MAX_AGE;
            var accessToken = jsonwebtoken_1.default.sign(payload, JWT_ACCESS_SECRET, { expiresIn: "3600s" });
            var refreshToken = jsonwebtoken_1.default.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "1d" });
            return {
                accessToken: accessToken,
                refreshToken: refreshToken
            };
        };
        this.getRefreshToken = function (token) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.repository.getOneByToken(token)];
                    case 1: return [2, _a.sent()];
                }
            });
        }); };
        this.saveRefreshToken = function (userId, refreshToken) { return __awaiter(_this, void 0, void 0, function () {
            var documen;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.repository.getOneByUserId(userId)];
                    case 1:
                        documen = _a.sent();
                        if (!documen) return [3, 3];
                        documen.refreshToken = refreshToken;
                        return [4, documen.save()];
                    case 2: return [2, _a.sent()];
                    case 3:
                        ;
                        return [4, this.repository.create({ userId: userId, refreshToken: refreshToken })];
                    case 4: return [2, _a.sent()];
                }
            });
        }); };
        this.deleteRefreshToken = function (refreshToken) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.repository.deleteOne(refreshToken);
                return [2];
            });
        }); };
        this.validateAccessToken = function (token) {
            try {
                var res = (0, jsonwebtoken_1.verify)(token, process.env.JWT_ACCESS_SECRET);
                return res;
            }
            catch (error) {
                return null;
            }
        };
        this.validateRefreshToken = function (token) {
            try {
                var res = (0, jsonwebtoken_1.verify)(token, process.env.JWT_REFRESH_SECRET);
                return res;
            }
            catch (error) {
                return null;
            }
        };
        this.repository = new repositories_1.TokenRepository();
    }
    return TokenService;
}());
exports.TokenService = TokenService;
;
//# sourceMappingURL=token.service.js.map