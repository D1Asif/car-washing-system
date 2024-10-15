"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
var express_1 = __importDefault(require("express"));
var validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
var user_validation_1 = require("./user.validation");
var user_controller_1 = require("./user.controller");
var auth_1 = __importDefault(require("../../middlewares/auth"));
var router = express_1.default.Router();
router.post("/signup", (0, validateRequest_1.default)(user_validation_1.UserValidations.createUserValidationSchema), user_controller_1.UserControllers.createUser);
router.put("/update-account-info", (0, auth_1.default)('user', 'admin'), (0, validateRequest_1.default)(user_validation_1.UserValidations.updateAccountInfoValidation), user_controller_1.UserControllers.updateAccountInfo);
router.get("/users", (0, auth_1.default)('admin'), user_controller_1.UserControllers.getAllUsers);
router.put("/make-user-admin/:userId", (0, auth_1.default)('admin'), user_controller_1.UserControllers.makeUserAdmin);
exports.UserRoutes = router;
