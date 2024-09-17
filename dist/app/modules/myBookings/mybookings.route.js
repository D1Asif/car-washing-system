"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyBookingsRoutes = void 0;
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("../../middlewares/auth"));
var booking_controller_1 = require("../booking/booking.controller");
var router = express_1.default.Router();
router.get("/", (0, auth_1.default)("user"), booking_controller_1.BookingControllers.getUserBookings);
exports.MyBookingsRoutes = router;
