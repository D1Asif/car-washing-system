"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_route_1 = require("../modules/user/user.route");
var auth_route_1 = require("../modules/auth/auth.route");
var service_route_1 = require("../modules/service/service.route");
var slot_route_1 = require("../modules/slot/slot.route");
var booking_route_1 = require("../modules/booking/booking.route");
var mybookings_route_1 = require("../modules/myBookings/mybookings.route");
var review_route_1 = require("../modules/review/review.route");
var payment_route_1 = require("../modules/payment/payment.route");
var router = express_1.default.Router();
var moduleRoutes = [
    {
        path: "/auth",
        route: user_route_1.UserRoutes
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes
    },
    {
        path: "/services",
        route: service_route_1.ServiceRoutes
    },
    {
        path: "/slots",
        route: slot_route_1.SlotRoutes
    },
    {
        path: "/bookings",
        route: booking_route_1.BookingRoutes
    },
    {
        path: "/my-bookings",
        route: mybookings_route_1.MyBookingsRoutes
    },
    {
        path: "/reviews",
        route: review_route_1.ReviewRoutes
    },
    {
        path: "/payment",
        route: payment_route_1.PaymentRoutes
    },
];
moduleRoutes.forEach(function (route) { return router.use(route.path, route.route); });
exports.default = router;
