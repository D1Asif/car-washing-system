"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
var mongoose_1 = require("mongoose");
var serviceSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});
serviceSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
serviceSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
serviceSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
exports.Service = (0, mongoose_1.model)('Service', serviceSchema);
