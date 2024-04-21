"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponseDto = void 0;
var UserResponseDto = (function () {
    function UserResponseDto(doc) {
        this.userId = doc.id;
        this.email = doc.email;
        this.firstName = doc.firstName;
        this.lastName = doc.lastName;
        this.phoneNumber = doc.phoneNumber;
        this.avatar = doc.avatar;
    }
    return UserResponseDto;
}());
exports.UserResponseDto = UserResponseDto;
;
//# sourceMappingURL=userResponse.dto.js.map