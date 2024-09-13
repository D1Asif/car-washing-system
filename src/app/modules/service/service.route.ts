import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceValidations } from './service.validation';
import { ServiceControllers } from './service.controller';

const router = express.Router();

router.post("/", auth('admin'), validateRequest(ServiceValidations.createServiceValidationSchema), ServiceControllers.createService);

router.get("/:id", );

router.get("/", );

router.put("/:id", );

router.delete("/:id", );

export const ServiceRoutes = router;