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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var https_1 = __importDefault(require("https"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var core_1 = require("./core");
var root_router_1 = require("./routers/root.router");
var middlewares_1 = require("./middlewares");
dotenv_1.default.config({ path: path_1.default.join(__dirname, "..", ".env.".concat(process.env.NODE_ENV)) });
var key = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "cert/private.key"));
var cert = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "cert/certificate.crt"));
var cred = {
    key: key,
    cert: cert,
};
var PORT = process.env.PORT || 3000;
var app = (0, express_1.default)();
app.set('port', PORT);
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: process.env.WEB_APP_URL,
}));
app.use('/api', root_router_1.rootRouter);
app.use(middlewares_1.errorHandlerMW);
var start = function () { return __awaiter(void 0, void 0, void 0, function () {
    var httpServer, httpsServer, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, (0, core_1.connectDB)()];
            case 1:
                _a.sent();
                httpServer = app.listen(PORT, function () { return console.log('Server started on port: ' + PORT); });
                httpsServer = https_1.default.createServer(cred, app);
                httpsServer.listen(8443);
                return [2, httpServer];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [3, 3];
            case 3: return [2];
        }
    });
}); };
start()
    .then(function (server) {
    var wsManager = new core_1.WebSocketManager(server);
    wsManager.init();
})
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=index.js.map