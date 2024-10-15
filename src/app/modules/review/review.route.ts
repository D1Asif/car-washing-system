import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { ReviewValidations } from "./review.validation";
import { ReviewControllers } from "./review.controller";

const router = express.Router();

router.post("/", auth('user'), validateRequest(ReviewValidations.createReviewValidationSchema), ReviewControllers.createReview);

router.get("/", ReviewControllers.getAllReviews);

export const ReviewRoutes = router;