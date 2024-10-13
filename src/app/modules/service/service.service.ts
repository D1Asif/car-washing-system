import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TService } from "./service.interface"
import { Service } from "./service.model"
import QueryBuilder from "../../builder/QueryBuilder";

const createServiceIntoDB = async (payload: TService) => {
    const newService = await Service.create(payload);
    return newService;
}

const getAServiceByIdFromDB = async (id: string) => {
    const service = await Service.findById(id);
    return service;
}

const getAllServicesFromDB = async (query: Record<string, unknown>) => {
    const serviceQuery = new QueryBuilder(Service.find(), query)
                                .search(["name", "description"])
                                .filter()
                                .sort()

    const services = await serviceQuery.modelQuery;
    
    return services;
}

const updateAServiceIntoDB = async (id: string, payload: Partial<TService>) => {
    const service = await Service.findById(id);

    if (!service) {
        throw new AppError(httpStatus.NOT_FOUND, "Service not found");
    }

    const updatedService = await Service.findByIdAndUpdate(
        id,
        payload,
        { new: true }
    )

    return updatedService;
}

const deleteServiceFromDB = async (id: string) => {
    const service = await Service.findById(id);

    if (!service) {
        throw new AppError(httpStatus.NOT_FOUND, "Service not found");
    }

    const updatedService = await Service.findByIdAndUpdate(
        id,
        {isDeleted: true},
        { new: true }
    )

    return updatedService;
}

export const ServiceServices = {
    createServiceIntoDB,
    getAServiceByIdFromDB,
    getAllServicesFromDB,
    updateAServiceIntoDB,
    deleteServiceFromDB
}