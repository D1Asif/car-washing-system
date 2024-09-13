import { Types } from "mongoose";

type SlotStatus = 'available' | 'booked' | 'canceled';

export type TCreateSlotsPayload = {
    service: Types.ObjectId;
    date: Date;
    startTime: string; // 09:30 format
    endTime: string; // 14:30 format
}

export type TSlot = {
    service: Types.ObjectId;
    date: Date;
    startTime: string; // 09:30 format
    endTime: string; // 14:30 format
    isBooked: SlotStatus;
}