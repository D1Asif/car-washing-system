import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceValidations } from './service.validation';
import { ServiceControllers } from './service.controller';
import { SlotValidations } from '../slot/slot.validation';
import { SlotControllers } from '../slot/slot.controller';

const router = express.Router();

router.post("/", auth('admin'), validateRequest(ServiceValidations.createServiceValidationSchema), ServiceControllers.createService);

router.get("/:id", ServiceControllers.getAService);

router.get("/", ServiceControllers.getAllServices);

router.put("/:id", auth('admin'), validateRequest(ServiceValidations.updateServiceValidationSchema), ServiceControllers.updateAService);

router.delete("/:id", auth('admin'), ServiceControllers.deleteAService);

router.post("/slots", auth('admin'), validateRequest(SlotValidations.createSlotsValidationSchema), SlotControllers.createSlots);

export const ServiceRoutes = router;