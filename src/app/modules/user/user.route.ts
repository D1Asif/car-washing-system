import express, { Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post("/signup", validateRequest(UserValidations.createUserValidationSchema), UserControllers.createUser);

router.put("/update-account-info", auth('user', 'admin'), validateRequest(UserValidations.updateAccountInfoValidation), UserControllers.updateAccountInfo);

export const UserRoutes = router;