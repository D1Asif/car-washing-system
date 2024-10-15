import mongoose from "mongoose";

export type TReview = {
    user: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
}