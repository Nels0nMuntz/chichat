"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorException = void 0;
var errorCode_1 = require("./errorCode");
var ErrorException = (function (_super) {
    __extends(ErrorException, _super);
    function ErrorException(code, message, metaData) {
        var _newTarget = this.constructor;
        var _this = _super.call(this) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.code = code;
        _this.metaData = metaData;
        _this.message = message;
        switch (code) {
            case errorCode_1.ErrorCode.BAD_REQUEST:
                _this.status = 400;
                break;
            case errorCode_1.ErrorCode.UNAUTORIEZED:
                _this.status = 401;
                break;
            case errorCode_1.ErrorCode.NOT_FOUND:
                _this.status = 404;
                break;
            default:
                _this.status = 500;
                break;
        }
        return _this;
    }
    ;
    ErrorException.UnauthorizedError = function () {
        return new ErrorException(errorCode_1.ErrorCode.UNAUTORIEZED, "User is not authorized");
    };
    ErrorException.BadRequestError = function (message, metaData) {
        return new ErrorException(errorCode_1.ErrorCode.BAD_REQUEST, message, metaData);
    };
    ErrorException.ServerError = function (message, metaData) {
        var _message = message || "Internal server error";
        return new ErrorException(errorCode_1.ErrorCode.INTERNAL_SERVER_ERROR, _message, metaData);
    };
    return ErrorException;
}(Error));
exports.ErrorException = ErrorException;
;
//# sourceMappingURL=errorException.js.map