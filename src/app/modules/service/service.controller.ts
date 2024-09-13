import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ServiceServices } from "./service.service";

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

})

const getAllServices = catchAsync(async (req, res) => {

})

const updateAService = catchAsync(async (req, res) => {

})

const deleteAService = catchAsync(async (req, res) => {

});

export const ServiceControllers = {
    createService,
    getAService,
    getAllServices,
    updateAService,
    deleteAService
}