import { TUser } from "./user.interface"
import { User } from "./user.model"

const createUserIntoDB = async (payload: TUser) => {
    const newUser = await User.create(payload);
    return newUser;
}

const updateAccountInfo = async (userEmail: string, payload: Partial<TUser>) => {
    const updatedUser = await User.findOneAndUpdate(
        { email: userEmail },
        payload,
        { new: true }
    )

    return updatedUser;
}

const getAllUsersFromDB = async () => {
    const users = await User.find({});

    return users;
}

export const UserServices = {
    createUserIntoDB,
    updateAccountInfo,
    getAllUsersFromDB
}