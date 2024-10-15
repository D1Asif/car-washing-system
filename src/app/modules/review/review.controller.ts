import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ReviewServices } from "./review.service";

const createReview = catchAsync(async (req, res) => {
    const result = await ReviewServices.createReviewIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Review is successfully created",
        data: result
    })
});

const getAllReviews = catchAsync(async (req, res) => {
    const result = await ReviewServices.getAllReviewsFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Reviews are successfully retrieved",
        data: result
    })
})

export const ReviewControllers = {
    createReview,
    getAllReviews
}