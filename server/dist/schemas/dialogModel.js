"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dialogModel = void 0;
var mongoose_1 = require("mongoose");
;
;
;
var dialogSchema = new mongoose_1.Schema({
    member_1: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    member_2: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    messages: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Message",
        }
    ]
}, {
    timestamps: true,
});
exports.dialogModel = (0, mongoose_1.model)("Dialog", dialogSchema);
//# sourceMappingURL=dialogModel.js.map