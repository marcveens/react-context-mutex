"use strict";
exports.__esModule = true;
var react_1 = require("react");
var MutexContext_1 = require("./MutexContext");
var createMutex_1 = require("./createMutex");
exports.useMutex = function () {
    var mutexContext = react_1.useContext(MutexContext_1.MutexContext);
    var Mutex = createMutex_1.createMutex(mutexContext);
    return {
        mutexContext: mutexContext,
        Mutex: Mutex
    };
};
