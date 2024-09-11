import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../interface/error";
import config from "../config";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import handleMongoValidationError from "../errors/handleValidationError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/AppError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // default values
    let statusCode = 500;
    let message = "Something went wrong";

    let errorSources: TErrorSources = [
        {
            path: "",
            message: "Something went Wrong"
        }
    ];

    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    } else if (err?.name === "ValidationError") {
        const simplifiedError = handleMongoValidationError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    } else if (err?.code === 11000) {
        const simplifiedError = handleDuplicateError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    } else if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
        errorSources = [
            {
                path: '',
                message: err.message
            }
        ]
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err,
        stack: config.node_env === "development" ? err.stack : null
    })
};

export default globalErrorHandler;