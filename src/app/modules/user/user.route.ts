import express, { Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post("/signup", validateRequest(UserValidations.createUserValidationSchema), UserControllers.createUser);

export const UserRoutes = router;