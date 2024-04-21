"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WSClientsMap = void 0;
var WSClientsMap = (function () {
    function WSClientsMap() {
        var _this = this;
        this.getClient = function (clientId) {
            return _this._clients.get(clientId);
        };
        this.setClient = function (clientId, socket) {
            _this._clients.set(clientId, socket);
        };
        this._clients = new Map();
    }
    Object.defineProperty(WSClientsMap.prototype, "clients", {
        get: function () {
            return this._clients;
        },
        enumerable: false,
        configurable: true
    });
    return WSClientsMap;
}());
exports.WSClientsMap = WSClientsMap;
;
//# sourceMappingURL=WSClientsMap.js.map