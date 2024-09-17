"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var routes_1 = __importDefault(require("./app/routes"));
var notFound_1 = __importDefault(require("./app/middlewares/notFound"));
var globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
var app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use('/api', routes_1.default);
app.use("/", function (req, res) {
    res.send("Welcome to Car washing system API!");
});
app.use("/test", function (req, res) {
    res.send("test route");
});
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
