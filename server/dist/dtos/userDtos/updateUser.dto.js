"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = void 0;
var UpdateUserDto = (function () {
    function UpdateUserDto(userData, userId) {
        this.userId = userId;
        this.firstName = userData.firstName;
        this.lastName = userData.lastName;
        this.avatar = userData.photo;
    }
    return UpdateUserDto;
}());
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=updateUser.dto.js.map