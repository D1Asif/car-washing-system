import { TUser } from "./user.interface"
import { User } from "./user.model"

const createUserIntoDB = async (payload: TUser) => {
    const newUser = await User.create(payload);
    return newUser;
}

export const UserServices = {
    createUserIntoDB
}