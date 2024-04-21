"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMessageRequestDto = void 0;
var CreateMessageRequestDto = (function () {
    function CreateMessageRequestDto(message) {
        this.dialogId = message.dialogId;
        this.createdBy = message.createdBy;
        this.content = message.content;
    }
    return CreateMessageRequestDto;
}());
exports.CreateMessageRequestDto = CreateMessageRequestDto;
;
//# sourceMappingURL=createMessageRequest.dto.js.map