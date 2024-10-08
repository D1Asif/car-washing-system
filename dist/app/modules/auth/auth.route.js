"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
var express_1 = __importDefault(require("express"));
var validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
var auth_validation_1 = require("./auth.validation");
var auth_controller_1 = require("./auth.controller");
var router = express_1.default.Router();
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.AuthValidations.loginSchema), auth_controller_1.AuthControllers.loginUser);
exports.AuthRoutes = router;
