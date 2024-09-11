import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
    const statusCode = 400;

    const key = Object.keys(err.errorResponse.keyValue)[0];
    const value = Object.values(err.errorResponse.keyValue)[0];

    const errorSources: TErrorSources = [
        {
            path: key,
            message: `${value} already exists`
        }
    ]

    return {
        statusCode,
        message: "Duplicate error",
        errorSources
    }
};

export default handleDuplicateError;