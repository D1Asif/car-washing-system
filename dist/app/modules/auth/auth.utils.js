"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var createToken = function (jwtPayload, jwtSecret, expiresIn) {
    var token = jsonwebtoken_1.default.sign(jwtPayload, jwtSecret, { expiresIn: expiresIn });
    return token;
};
exports.createToken = createToken;
