"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoutes = void 0;
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("../../middlewares/auth"));
var validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
var service_validation_1 = require("./service.validation");
var service_controller_1 = require("./service.controller");
var slot_validation_1 = require("../slot/slot.validation");
var slot_controller_1 = require("../slot/slot.controller");
var router = express_1.default.Router();
router.post("/", (0, auth_1.default)('admin'), (0, validateRequest_1.default)(service_validation_1.ServiceValidations.createServiceValidationSchema), service_controller_1.ServiceControllers.createService);
router.get("/:id", service_controller_1.ServiceControllers.getAService);
router.get("/", service_controller_1.ServiceControllers.getAllServices);
router.put("/:id", (0, auth_1.default)('admin'), (0, validateRequest_1.default)(service_validation_1.ServiceValidations.updateServiceValidationSchema), service_controller_1.ServiceControllers.updateAService);
router.delete("/:id", (0, auth_1.default)('admin'), service_controller_1.ServiceControllers.deleteAService);
router.post("/slots", (0, auth_1.default)('admin'), (0, validateRequest_1.default)(slot_validation_1.SlotValidations.createSlotsValidationSchema), slot_controller_1.SlotControllers.createSlots);
exports.ServiceRoutes = router;
