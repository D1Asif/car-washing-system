import express, { Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post("/signup", validateRequest(UserValidations.createUserValidationSchema), UserControllers.createUser);

router.put("/update-account-info", auth('user', 'admin'), validateRequest(UserValidations.updateAccountInfoValidation), UserControllers.updateAccountInfo);

router.get("/users", auth('admin'), UserControllers.getAllUsers);

router.put("/make-user-admin/:userId", auth('admin'), UserControllers.makeUserAdmin)

export const UserRoutes = router;