import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleMongoValidationError = (err: mongoose.Error.ValidationError): TGenericErrorResponse => {
    const statusCode = 400;
    const errorSources: TErrorSources = Object.values(err?.errors).map((value) => (
        {
            message: value.message,
            path: value.path
        }
    ));

    return {
        statusCode,
        message: "Validation error",
        errorSources
    }
}

export default handleMongoValidationError;