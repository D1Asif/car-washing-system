import express from "express";
import { SlotControllers } from "./slot.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { SlotValidations } from "./slot.validation";

const router = express.Router();

router.get("/availability", SlotControllers.getAvailableSlots);

router.get("/", SlotControllers.getAllSlots);

router.get("/:slotId", SlotControllers.getSlotByID)

router.put("/update-status/:slotId", auth('admin'), validateRequest(SlotValidations.updateSlotStatusSchema), SlotControllers.updateSlotStatus)

export const SlotRoutes = router;