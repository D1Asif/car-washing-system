"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handleDuplicateError = function (err) {
    var statusCode = 400;
    var key = Object.keys(err.errorResponse.keyValue)[0];
    var value = Object.values(err.errorResponse.keyValue)[0];
    var errorSources = [
        {
            path: key,
            message: value + " already exists"
        }
    ];
    return {
        statusCode: statusCode,
        message: "Duplicate error",
        errorSources: errorSources
    };
};
exports.default = handleDuplicateError;
