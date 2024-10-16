"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
var express_1 = __importDefault(require("express"));
var payment_controller_1 = require("./payment.controller");
var router = express_1.default.Router();
router.post("/confirmation", payment_controller_1.PaymentControllers.confirmPayment);
exports.PaymentRoutes = router;
