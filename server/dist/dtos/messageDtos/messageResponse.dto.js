"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageResponseDto = void 0;
var MessageResponseDto = (function () {
    function MessageResponseDto(doc) {
        this.messageId = doc._id;
        this.dialogId = doc.dialogId;
        this.createdBy = doc.createdBy;
        this.read = doc.read;
        this.content = {
            text: doc.content.text,
            attach: doc.content.attach && doc.content.attach.map(function (attach) { return ({
                attachId: attach['_id'],
                attachType: attach.attachType,
                fileType: attach.fileType,
                name: attach.name,
                url: attach.url,
                createdAt: attach.createdAt,
                updatedAt: attach.updatedAt,
            }); }),
        };
        this.createdAt = doc.createdAt;
        this.updatedAt = doc.updatedAt;
    }
    return MessageResponseDto;
}());
exports.MessageResponseDto = MessageResponseDto;
;
//# sourceMappingURL=messageResponse.dto.js.map