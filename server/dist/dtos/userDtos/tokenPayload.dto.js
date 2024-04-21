"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenPayloadDto = void 0;
var TokenPayloadDto = (function () {
    function TokenPayloadDto(user) {
        this.email = user.email;
        this.id = user._id;
        this.isActivated = user.isActivated;
    }
    return TokenPayloadDto;
}());
exports.TokenPayloadDto = TokenPayloadDto;
;
//# sourceMappingURL=tokenPayload.dto.js.map