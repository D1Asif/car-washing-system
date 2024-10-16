"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplate = exports.verifyPayment = exports.payment = void 0;
var config_1 = __importDefault(require("../../config"));
var payment = function (paymentData) { return __awaiter(void 0, void 0, void 0, function () {
    var paymentBody, res, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                paymentBody = {
                    store_id: "aamarpaytest",
                    tran_id: paymentData.transactionId,
                    success_url: config_1.default.deployment_url + "api/payment/confirmation?transactionId=" + paymentData.transactionId + "&status=success&bookingId=" + paymentData.bookingId,
                    fail_url: config_1.default.deployment_url + "api/payment/confirmation?status=failure",
                    cancel_url: config_1.default.frontend_deployment_url,
                    amount: paymentData.amount,
                    currency: "USD",
                    signature_key: config_1.default.payment_signature_key,
                    desc: "Booking Payment",
                    cus_name: paymentData.customerName,
                    cus_email: paymentData.customerEmail,
                    cus_phone: paymentData.customerPhone,
                    type: "json"
                };
                return [4 /*yield*/, fetch(config_1.default.payment_api_url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json', // Set the content type to JSON
                        },
                        body: JSON.stringify(paymentBody)
                    })];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                data = _a.sent();
                return [2 /*return*/, data];
        }
    });
}); };
exports.payment = payment;
var verifyPayment = function (transactionId) { return __awaiter(void 0, void 0, void 0, function () {
    var res, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(config_1.default.payment_verification_url + "?request_id=" + transactionId + "&store_id=" + config_1.default.payment_store_id + "&signature_key=" + config_1.default.payment_signature_key + "&type=json")];
            case 1:
                res = _a.sent();
                data = res.json();
                return [2 /*return*/, data];
        }
    });
}); };
exports.verifyPayment = verifyPayment;
var getTemplate = function (message) {
    return "\n        <html lang=\"en\">\n\n            <head>\n                <meta charset=\"UTF-8\">\n                <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n                <title>Payment Confirmation</title>\n                <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n                <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n                <link\n                    href=\"https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap\"\n                    rel=\"stylesheet\">\n                <style>\n                    body {\n                        font-family: 'Roboto', sans-serif;\n                    }\n                </style>\n            </head>\n\n            <body>\n                <div\n                    style=\"display: flex; flex-direction: column; align-items: center; justify-content: center; height:100svh; font-size: xx-large;\">\n                    " + message + "\n                    <a\n                        href=\"https://car-washing-system-client-sigma.vercel.app/\"\n                        style=\"margin-top: 20px; background: #006adb; color: white; border: none; padding: 10px; border-radius: 10px; font-size: large; text-decoration: none;\">\n                        Go to Home\n                    </a>\n                </div>\n            </body>\n\n        </html>\n    ";
};
exports.getTemplate = getTemplate;
