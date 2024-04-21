"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmptyString = void 0;
var isEmptyString = function (value) {
    if (!value)
        return true;
    var _value = value.toString();
    return !_value.length || !_value.replace(/\s/g, '').length;
};
exports.isEmptyString = isEmptyString;
//# sourceMappingURL=isEmptyString.js.map