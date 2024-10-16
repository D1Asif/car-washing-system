"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    port: process.env.PORT,
    database_uri: process.env.DATABASE_URI,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    node_env: process.env.NODE_ENV,
    jwt_secret: process.env.JWT_SECRET,
    jwt_expires_in: process.env.JWT_EXPIRES_IN,
    payment_store_id: process.env.PAYMENT_STORE_ID,
    payment_signature_key: process.env.PAYMENT_SIGNATURE_KEY,
    payment_api_url: process.env.PAYMENT_API_URL,
    payment_verification_url: process.env.PAYMENT_VERIFICATION_URL,
    deployment_url: process.env.DEPLOYMENT_URL,
    frontend_deployment_url: process.env.FRONTEND_DEPLOYMENT_URL
};
