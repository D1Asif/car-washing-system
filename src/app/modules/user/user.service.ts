import { TUser } from "./user.interface"
import { User } from "./user.model"

const createUserIntoDB = async (payload: TUser) => {
    const newUser = await User.create(payload);
    return newUser;
    // try {

    // } catch (err) {
    //     console.log(err);
    //     if (err instanceof Error) {
    //         // Access the message property safely
    //         throw new Error(`Error creating user: ${err.message}`);
    //     } else {
    //         // If the error is not an instance of Error, throw a generic error
    //         throw new Error('An unknown error occurred while creating user.');
    //     }
    // }
}

export const UserServices = {
    createUserIntoDB
}