import { TReview } from "./review.interface";
import { Review } from "./review.model";

const createReviewIntoDB = async (payload: TReview) => {
    const review = await Review.create(payload);

    return review
}

const getAllReviewsFromDB = async () => {
    const reviews = await Review.find({}).populate('user');

    return reviews;
}

export const ReviewServices = {
    createReviewIntoDB,
    getAllReviewsFromDB
}