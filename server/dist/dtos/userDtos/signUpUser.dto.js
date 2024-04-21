"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpUserDto = void 0;
var helpers_1 = require("../../helpers");
var SignUpUserDto = (function () {
    function SignUpUserDto(user) {
        this.email = user.email;
        this.firstName = user.firstName;
        this.lastName = (0, helpers_1.isEmptyString)(user.lastName) ? undefined : user.lastName;
        this.phoneNumber = user.phoneNumber;
        this.password = user.password;
    }
    ;
    return SignUpUserDto;
}());
exports.SignUpUserDto = SignUpUserDto;
;
//# sourceMappingURL=signUpUser.dto.js.map