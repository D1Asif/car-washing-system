"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handleCastError = function (err) {
    var statusCode = 400;
    var errorSources = [
        {
            path: "",
            message: err.message
        }
    ];
    return {
        statusCode: statusCode,
        message: "Invalid ID",
        errorSources: errorSources
    };
};
exports.default = handleCastError;
