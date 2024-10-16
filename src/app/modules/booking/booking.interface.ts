import { Types } from "mongoose";
import { VEHICLE_TYPE } from "./booking.constant";

type TVehicleType = keyof typeof VEHICLE_TYPE;

export type TBooking = {
  customer: Types.ObjectId;     // Reference to the user who made the booking
  service: Types.ObjectId;      // Reference to the booked service
  slot: Types.ObjectId;         // Reference to the booking slot
  vehicleType: TVehicleType;     // Type of the vehicle
  vehicleBrand: string;         // Brand or manufacturer of the vehicle
  vehicleModel: string;         // Model or variant of the vehicle
  manufacturingYear: number;    // Manufacturing year of the vehicle
  registrationPlate: string;    // Unique registration number assigned to the vehicle
  paymentStatus: 'pending' | 'paid' | 'canceled';
};
