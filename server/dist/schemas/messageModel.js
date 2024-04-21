"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageModel = void 0;
var mongoose_1 = require("mongoose");
;
;
;
var messageAttachSchema = new mongoose_1.Schema({
    name: String,
    url: String,
    fileType: {
        type: {
            ext: String,
            mime: String,
        },
    },
    attachType: String,
}, {
    timestamps: true,
});
var messageSchema = new mongoose_1.Schema({
    dialogId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Dialog",
        required: true,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    read: {
        type: Boolean,
        default: false,
        required: true,
    },
    content: {
        text: {
            type: String,
            required: false,
        },
        attach: {
            type: [messageAttachSchema],
            required: false,
        }
    },
}, {
    timestamps: true,
});
exports.messageModel = (0, mongoose_1.model)("Message", messageSchema);
//# sourceMappingURL=messageModel.js.map