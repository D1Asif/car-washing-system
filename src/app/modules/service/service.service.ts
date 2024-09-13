import { TService } from "./service.interface"
import { Service } from "./service.model"

const createServiceIntoDB = async (payload: TService) => {
    const newService = await Service.create(payload);
    return newService;
}

export const ServiceServices = {
    createServiceIntoDB
}