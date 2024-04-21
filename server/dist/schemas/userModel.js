"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
var mongoose_1 = require("mongoose");
;
;
;
var userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    passwordOrigin: {
        type: String,
        required: true,
    },
    isActivated: {
        type: Boolean,
        default: false,
        required: true,
    },
    activationId: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
    }
});
exports.userModel = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=userModel.js.map