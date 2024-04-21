"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDialogResponseDto = void 0;
var CreateDialogResponseDto = (function () {
    function CreateDialogResponseDto(doc) {
        this.dialogId = doc._id;
        this.member_1 = doc.member_1;
        this.member_2 = doc.member_2;
        this.messages = doc.messages;
    }
    return CreateDialogResponseDto;
}());
exports.CreateDialogResponseDto = CreateDialogResponseDto;
;
//# sourceMappingURL=createDialogResponse.dto.js.map