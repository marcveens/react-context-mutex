"use strict";
exports.__esModule = true;
exports.createMutex = function (context) {
    return /** @class */ (function () {
        function Mutex(id) {
            var _this = this;
            this.run = function (callback) {
                if (!_this.isLocked()) {
                    callback();
                }
            };
            this.lock = function () {
                if (!_this.isLocked()) {
                    context.push(_this.id);
                }
            };
            this.unlock = function () {
                var index = context.indexOf(_this.id);
                if (index > -1) {
                    context.splice(index, 1);
                }
            };
            this.isLocked = function () {
                return context.indexOf(_this.id) > -1;
            };
            this.id = id;
        }
        return Mutex;
    }());
};
