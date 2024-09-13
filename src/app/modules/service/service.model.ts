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
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

export const Service = model<TService>('Service', serviceSchema);