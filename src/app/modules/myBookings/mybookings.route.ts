import express from "express";
import auth from "../../middlewares/auth";
import { BookingControllers } from "../booking/booking.controller";

const router = express.Router();

router.get("/", auth("user"), BookingControllers.getUserBookings)

export const MyBookingsRoutes = router;