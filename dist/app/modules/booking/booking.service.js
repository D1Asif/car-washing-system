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
exports.BookingServices = void 0;
var http_status_1 = __importDefault(require("http-status"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
var service_model_1 = require("../service/service.model");
var booking_model_1 = require("./booking.model");
var slot_model_1 = require("../slot/slot.model");
var mongoose_1 = __importDefault(require("mongoose"));
var user_model_1 = require("../user/user.model");
var createBookingIntoDB = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var service, slot, session, newBooking, updatedSlot, updatedBooking, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, service_model_1.Service.findById(payload.service)];
            case 1:
                service = _a.sent();
                if (!service) {
                    throw new AppError_1.default(http_status_1.default.NOT_FOUND, "The service does not exist!");
                }
                return [4 /*yield*/, slot_model_1.Slot.findById(payload.slot)];
            case 2:
                slot = _a.sent();
                if (!slot) {
                    throw new AppError_1.default(http_status_1.default.NOT_FOUND, "The slot does not exist!");
                }
                if (slot.isBooked !== "available") {
                    throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "The slot is not available!");
                }
                if (slot.service.toString() !== payload.service.toString()) {
                    throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Service and slot mismatch!");
                }
                return [4 /*yield*/, mongoose_1.default.startSession()];
            case 3:
                session = _a.sent();
                _a.label = 4;
            case 4:
                _a.trys.push([4, 9, 11, 13]);
                session.startTransaction();
                return [4 /*yield*/, booking_model_1.Booking.create([payload], { session: session })];
            case 5:
                newBooking = _a.sent();
                return [4 /*yield*/, slot_model_1.Slot.findByIdAndUpdate(payload.slot, { isBooked: "booked" }, { new: true, session: session })];
            case 6:
                updatedSlot = _a.sent();
                return [4 /*yield*/, session.commitTransaction()];
            case 7:
                _a.sent();
                return [4 /*yield*/, booking_model_1.Booking.findById(newBooking[0].id)
                        .populate("service")
                        .populate("customer")
                        .populate("slot")];
            case 8:
                updatedBooking = _a.sent();
                return [2 /*return*/, updatedBooking];
            case 9:
                err_1 = _a.sent();
                return [4 /*yield*/, session.abortTransaction()];
            case 10:
                _a.sent();
                throw err_1;
            case 11: return [4 /*yield*/, session.endSession()];
            case 12:
                _a.sent();
                return [7 /*endfinally*/];
            case 13: return [2 /*return*/];
        }
    });
}); };
var getAllBookingsFromDB = function () { return __awaiter(void 0, void 0, void 0, function () {
    var bookings;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, booking_model_1.Booking.find()
                    .populate("customer")
                    .populate("service")
                    .populate("slot")];
            case 1:
                bookings = _a.sent();
                return [2 /*return*/, bookings];
        }
    });
}); };
var getUserBookingsFromDB = function (userEmail, query) { return __awaiter(void 0, void 0, void 0, function () {
    var user, currentDate, userBookings;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_1.User.findOne({ email: userEmail })];
            case 1:
                user = _a.sent();
                currentDate = new Date();
                if (!user) {
                    throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
                }
                if (!!(query === null || query === void 0 ? void 0 : query.time)) return [3 /*break*/, 3];
                return [4 /*yield*/, booking_model_1.Booking.find({ customer: user._id })
                        .populate("service")
                        .populate("slot")];
            case 2:
                userBookings = _a.sent();
                _a.label = 3;
            case 3:
                if (!(query.time === 'past')) return [3 /*break*/, 5];
                return [4 /*yield*/, booking_model_1.Booking.aggregate([
                        {
                            $match: { customer: user._id } // Match user bookings
                        },
                        {
                            $lookup: {
                                from: 'slots',
                                localField: 'slot',
                                foreignField: '_id',
                                as: 'slot' // Output field
                            }
                        },
                        { $unwind: '$slot' },
                        {
                            $lookup: {
                                from: 'services',
                                localField: 'service',
                                foreignField: '_id',
                                as: 'service' // Output field
                            }
                        },
                        { $unwind: '$service' },
                        {
                            $addFields: {
                                slotDateTime: {
                                    $dateFromString: {
                                        dateString: {
                                            $concat: [
                                                { $dateToString: { format: "%Y-%m-%d", date: "$slot.date" } },
                                                "T", "$slot.startTime" // Append startTime
                                            ]
                                        }
                                    }
                                }
                            }
                        },
                        {
                            $match: { slotDateTime: { $lt: currentDate } } // Filter past bookings
                        },
                        {
                            $sort: { sortDateTime: -1 }
                        }
                    ])];
            case 4:
                userBookings = _a.sent();
                _a.label = 5;
            case 5:
                if (!((query === null || query === void 0 ? void 0 : query.time) === "upcoming")) return [3 /*break*/, 7];
                return [4 /*yield*/, booking_model_1.Booking.aggregate([
                        {
                            $match: { customer: user._id } // Match user bookings
                        },
                        {
                            $lookup: {
                                from: 'slots',
                                localField: 'slot',
                                foreignField: '_id',
                                as: 'slot' // Output field
                            }
                        },
                        { $unwind: '$slot' },
                        {
                            $lookup: {
                                from: 'services',
                                localField: 'service',
                                foreignField: '_id',
                                as: 'service' // Output field
                            }
                        },
                        { $unwind: '$service' },
                        {
                            $addFields: {
                                slotDateTime: {
                                    $dateFromString: {
                                        dateString: {
                                            $concat: [
                                                { $dateToString: { format: "%Y-%m-%d", date: "$slot.date" } },
                                                "T", "$slot.startTime" // Append startTime
                                            ]
                                        }
                                    }
                                }
                            }
                        },
                        {
                            $match: { slotDateTime: { $gte: currentDate } } // Filter upcoming bookings
                        },
                        {
                            $sort: { sortDateTime: 1 }
                        }
                    ])];
            case 6:
                userBookings = _a.sent();
                _a.label = 7;
            case 7: return [2 /*return*/, userBookings];
        }
    });
}); };
exports.BookingServices = {
    createBookingIntoDB: createBookingIntoDB,
    getAllBookingsFromDB: getAllBookingsFromDB,
    getUserBookingsFromDB: getUserBookingsFromDB
};
