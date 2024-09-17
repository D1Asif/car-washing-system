"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handleMongoValidationError = function (err) {
    var statusCode = 400;
    var errorSources = Object.values(err === null || err === void 0 ? void 0 : err.errors).map(function (value) { return ({
        message: value.message,
        path: value.path
    }); });
    return {
        statusCode: statusCode,
        message: "Validation error",
        errorSources: errorSources
    };
};
exports.default = handleMongoValidationError;
