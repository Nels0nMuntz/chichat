"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogsReasponseDto = void 0;
var messageDtos_1 = require("../messageDtos");
var userDtos_1 = require("../userDtos");
var DialogsReasponseDto = (function () {
    function DialogsReasponseDto(doc, userId) {
        var memberDoc = doc.member_1.id === userId ? doc.member_2 : doc.member_1;
        this.dialogId = doc.id;
        this.member = new userDtos_1.UserResponseDto(memberDoc);
        this.messages = doc.messages.map(function (msg) { return new messageDtos_1.MessageResponseDto(msg); });
    }
    return DialogsReasponseDto;
}());
exports.DialogsReasponseDto = DialogsReasponseDto;
//# sourceMappingURL=dialogsResponse.dto.js.map