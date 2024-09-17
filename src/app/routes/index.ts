import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { ServiceRoutes } from '../modules/service/service.route';
import { SlotRoutes } from '../modules/slot/slot.route';
import { BookingRoutes } from '../modules/booking/booking.route';

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
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;