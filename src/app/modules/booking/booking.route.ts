import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { BookingValidations } from "./booking.validation";
import { BookingControllers } from "./booking.controller";

const router = express.Router();

router.post("/", auth("user"), validateRequest(BookingValidations.createBookingValidationSchema), BookingControllers.createBooking);

router.get("/", auth("admin"), BookingControllers.getAllBookings)

export const BookingRoutes = router;