"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("../../middlewares/auth"));
var validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
var booking_validation_1 = require("./booking.validation");
var booking_controller_1 = require("./booking.controller");
var router = express_1.default.Router();
router.post("/", (0, auth_1.default)("user"), (0, validateRequest_1.default)(booking_validation_1.BookingValidations.createBookingValidationSchema), booking_controller_1.BookingControllers.createBooking);
router.get("/", (0, auth_1.default)("admin"), booking_controller_1.BookingControllers.getAllBookings);
exports.BookingRoutes = router;
