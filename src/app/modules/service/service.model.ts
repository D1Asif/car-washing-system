import { model, Schema } from "mongoose";
import { TService } from "./service.interface";

const serviceSchema = new Schema<TService>({
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
    tags: {
        type: [String],
        default: []
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

serviceSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } })

    next();
})

serviceSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } })

    next();
})

serviceSchema.pre('aggregate', function(next) {
    this.pipeline().unshift({$match: {isDeleted: {$ne: true}}});

    next();
})

export const Service = model<TService>('Service', serviceSchema);