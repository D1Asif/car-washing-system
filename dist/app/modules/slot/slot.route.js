"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotRoutes = void 0;
var express_1 = __importDefault(require("express"));
var slot_controller_1 = require("./slot.controller");
var auth_1 = __importDefault(require("../../middlewares/auth"));
var validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
var slot_validation_1 = require("./slot.validation");
var router = express_1.default.Router();
router.get("/availability", slot_controller_1.SlotControllers.getAvailableSlots);
router.get("/", slot_controller_1.SlotControllers.getAllSlots);
router.get("/:slotId", slot_controller_1.SlotControllers.getSlotByID);
router.put("/update-status/:slotId", (0, auth_1.default)('admin'), (0, validateRequest_1.default)(slot_validation_1.SlotValidations.updateSlotStatusSchema), slot_controller_1.SlotControllers.updateSlotStatus);
exports.SlotRoutes = router;
