import express from "express";
import { SlotControllers } from "./slot.controller";

const router = express.Router();

router.get("/availability", SlotControllers.getAvailableSlots);

router.get("/", SlotControllers.getAllSlots);

router.get("/:slotId", SlotControllers.getSlotByID)

export const SlotRoutes = router;