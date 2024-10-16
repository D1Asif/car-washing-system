import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { ServiceRoutes } from '../modules/service/service.route';
import { SlotRoutes } from '../modules/slot/slot.route';
import { BookingRoutes } from '../modules/booking/booking.route';
import { MyBookingsRoutes } from '../modules/myBookings/mybookings.route';
import { ReviewRoutes } from '../modules/review/review.route';
import { PaymentRoutes } from '../modules/payment/payment.route';

const router = express.Router();

const moduleRoutes = [
    {
        path: "/auth",
        route: UserRoutes
    },
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/services",
        route: ServiceRoutes
    },
    {
        path: "/slots",
        route: SlotRoutes
    },
    {
        path: "/bookings",
        route: BookingRoutes
    },
    {
        path: "/my-bookings",
        route: MyBookingsRoutes
    },
    {
        path: "/reviews",
        route: ReviewRoutes
    },
    {
        path: "/payment",
        route: PaymentRoutes
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;