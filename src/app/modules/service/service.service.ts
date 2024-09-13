import { TService } from "./service.interface"
import { Service } from "./service.model"

const createServiceIntoDB = async (payload: TService) => {
    const newService = await Service.create(payload);
    return newService;
}

const getAServiceByIdFromDB = async (id: string) => {
    const service = await Service.findById(id);
    return service;
}

const getAllServicesFromDB = async () => {
    const service = await Service.find();
    return service;
}

export const ServiceServices = {
    createServiceIntoDB,
    getAServiceByIdFromDB,
    getAllServicesFromDB
}