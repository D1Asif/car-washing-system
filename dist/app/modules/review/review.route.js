"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("../../middlewares/auth"));
var validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
var review_validation_1 = require("./review.validation");
var review_controller_1 = require("./review.controller");
var router = express_1.default.Router();
router.post("/", (0, auth_1.default)('user'), (0, validateRequest_1.default)(review_validation_1.ReviewValidations.createReviewValidationSchema), review_controller_1.ReviewControllers.createReview);
router.get("/", review_controller_1.ReviewControllers.getAllReviews);
exports.ReviewRoutes = router;
