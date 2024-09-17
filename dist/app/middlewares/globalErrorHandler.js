"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("../config"));
var zod_1 = require("zod");
var handleZodError_1 = __importDefault(require("../errors/handleZodError"));
var handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
var handleDuplicateError_1 = __importDefault(require("../errors/handleDuplicateError"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var handleCastError_1 = __importDefault(require("../errors/handleCastError"));
var http_status_1 = __importDefault(require("http-status"));
var globalErrorHandler = function (err, req, res, next) {
    // default values
    var statusCode = 500;
    var message = "Something went wrong";
    var errorSources = [
        {
            path: "",
            message: "Something went Wrong"
        }
    ];
    if (err instanceof zod_1.ZodError) {
        var simplifiedError = (0, handleZodError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        var simplifiedError = (0, handleValidationError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        var simplifiedError = (0, handleCastError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        var simplifiedError = (0, handleDuplicateError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "TokenExpiredError" || (err === null || err === void 0 ? void 0 : err.name) === "JsonWebTokenError") {
        statusCode = http_status_1.default.UNAUTHORIZED;
        message = "Authorization failure";
        errorSources = errorSources = [
            {
                path: '',
                message: err.message
            }
        ];
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
        errorSources = [
            {
                path: '',
                message: err.message
            }
        ];
    }
    res.status(statusCode).json({
        success: false,
        message: message,
        errorSources: errorSources,
        err: err,
        stack: config_1.default.node_env === "development" ? err.stack : null
    });
};
exports.default = globalErrorHandler;
