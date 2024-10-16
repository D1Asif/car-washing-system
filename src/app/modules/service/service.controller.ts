import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ServiceServices } from "./service.service";
import AppError from "../../errors/AppError";

const createService = catchAsync(async (req, res) => {
    const result = await ServiceServices.createServiceIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service created successfully",
        data: result
    });
})

const getAService = catchAsync(async (req, res) => {
    const result = await ServiceServices.getAServiceByIdFromDB(req.params.id);

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "No data found!")
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service retrieved successfully",
        data: result
    });
})

const getAllServices = catchAsync(async (req, res) => {
    const result = await ServiceServices.getAllServicesFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Services retrieved successfully",
        data: result
    });
})

const updateAService = catchAsync(async (req, res) => {
    const result = await ServiceServices.updateAServiceIntoDB(req.params.id, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service updated successfully",
        data: result
    });
})

const deleteAService = catchAsync(async (req, res) => {
    const result = await ServiceServices.deleteServiceFromDB(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service deleted successfully",
        data: result
    });
});

export const ServiceControllers = {
    createService,
    getAService,
    getAllServices,
    updateAService,
    deleteAService
}