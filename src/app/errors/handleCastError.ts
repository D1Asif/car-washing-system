import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleCastError = (err: any): TGenericErrorResponse => {
    const statusCode = 400;

    const errorSources: TErrorSources = [
        {
            path: "",
            message: err.message
        }
    ]

    return {
        statusCode,
        message: "Invalid ID",
        errorSources
    }
}

export default handleCastError;