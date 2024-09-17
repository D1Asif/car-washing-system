"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotRoutes = void 0;
var express_1 = __importDefault(require("express"));
var slot_controller_1 = require("./slot.controller");
var router = express_1.default.Router();
router.get("/availability", slot_controller_1.SlotControllers.getAvailableSlots);
exports.SlotRoutes = router;
