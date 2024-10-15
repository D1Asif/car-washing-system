"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
var mongoose_1 = require("mongoose");
var reviewSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});
exports.Review = (0, mongoose_1.model)('Review', reviewSchema);
