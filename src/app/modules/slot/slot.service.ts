import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Service } from "../service/service.model";
import { TCreateSlotsPayload, TSlot } from "./slot.interface"
import { convertTimeToMinutes, createSlots } from "./slot.util";
import { Slot } from "./slot.model";
import QueryBuilder from "../../builder/QueryBuilder";

const createSlotsIntoDB = async (payload: TCreateSlotsPayload) => {
    const service = await Service.findById(payload.service);

    if (!service) {
        throw new AppError(httpStatus.NOT_FOUND, "Service not found!");
    }

    const existingSlots = await Slot.find({
        service: payload.service,
        date: payload.date
    });

    if (convertTimeToMinutes(payload.startTime) > convertTimeToMinutes(payload.endTime)) {
        throw new AppError(httpStatus.BAD_REQUEST, "Start time cannot be later than end time");
    }

    existingSlots.forEach((existingSlot) => {
        if (convertTimeToMinutes(existingSlot.startTime) < convertTimeToMinutes(payload.endTime) && convertTimeToMinutes(existingSlot.endTime) > convertTimeToMinutes(payload.startTime)) {
            throw new AppError(httpStatus.BAD_REQUEST, "Slot(s) already exists in the given interval")
        }
    })

    const slots = createSlots(payload.startTime, payload.endTime, service.duration);

    const slotDocs: TSlot[] = slots.map((slot) => ({
        service: payload.service,
        date: payload.date,
        startTime: slot.start,
        endTime: slot.end,
        isBooked: 'available'
    }));

    const result = await Slot.insertMany(slotDocs);

    return result;
}

const getAvailableSlotsFromDB = async (query: Record<string, unknown>) => {
    const availableSlotsQuery = new QueryBuilder(
        Slot.find({ isBooked: 'available' }).populate('service'),
        query
    ).filter();

    const availableSlots = await availableSlotsQuery.modelQuery;

    const refinedAvailableSlots = availableSlots.filter((slot) => slot.service !== null)

    return refinedAvailableSlots;
}

const getAllSlotsFromDB = async (query: Record<string, unknown>) => {
    const slotsQuery = new QueryBuilder(
        Slot.find(),
        query
    ).filter()

    const slots = await slotsQuery.modelQuery;

    return slots;
}

const getSlotByIdFromDB = async (slotId: string) => {
    const slot = await Slot.findById(slotId).populate('service');

    return slot;
}

const updateSlotStatusIntoDB = async (slotId: string, status: 'available' | 'canceled') => {
    const slot = await Slot.findById(slotId);

    if (!slot) {
        throw new AppError(httpStatus.NOT_FOUND, "Slot not found")
    }

    if (slot.isBooked === 'booked') {
        throw new AppError(httpStatus.BAD_REQUEST, "Booked slot status cannot be changed")
    }

    const updatedSlot = await Slot.findByIdAndUpdate(
        slotId,
        { isBooked: status },
        { new: true }
    )

    return updatedSlot;
}

export const SlotServices = {
    createSlotsIntoDB,
    getAvailableSlotsFromDB,
    getAllSlotsFromDB,
    getSlotByIdFromDB,
    updateSlotStatusIntoDB
}