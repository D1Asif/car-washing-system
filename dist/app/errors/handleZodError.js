"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handleZodError = function (err) {
    var statusCode = 400;
    var errorSources = err.issues.map(function (issue) { return ({
        path: issue.path.join(" -> "),
        message: issue.message
    }); });
    return {
        statusCode: statusCode,
        message: "Validation error",
        errorSources: errorSources
    };
};
exports.default = handleZodError;
