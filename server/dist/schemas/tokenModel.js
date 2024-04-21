"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenModel = void 0;
var mongoose_1 = require("mongoose");
;
;
;
var TokenSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        ref: "User",
    },
    refreshToken: {
        type: String,
        required: true,
    }
});
exports.tokenModel = (0, mongoose_1.model)("Token", TokenSchema);
//# sourceMappingURL=tokenModel.js.map