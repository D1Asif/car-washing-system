import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    search(searchableFields: string[]) {
        const searchTerm = this?.query?.searchTerm

        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => (
                    {
                        [field]: {
                            $regex: searchTerm,
                            $options: 'i'
                        }
                    }
                ) as FilterQuery<T>)
            });
        }

        return this;
    }

    filter() {
        // creating a query object so that direct value filters can be done with that. The fields that needs to be handled separately needs to be deleted from the query object and handle separately e.g. tags, minPrice, maxPrice.
        const queryObj = { ...this.query }
        
        if (queryObj?.serviceId) {
            queryObj.service = queryObj.serviceId;
            delete queryObj.serviceId;
        }
        if (queryObj.sort) {
            delete queryObj.sort;
        }

        const tags = (this.query?.tags as string)?.split(",");

        if (tags?.length) {
            delete queryObj.tags;
            this.modelQuery = this.modelQuery.find({ tags: { $all: tags } } as FilterQuery<T>)
        }

        if (this.query?.minPrice) {
            delete queryObj.minPrice;
            this.modelQuery = this.modelQuery.find({ price: { $gte: this.query.minPrice } } as FilterQuery<T>)
        }

        if (this.query?.maxPrice) {
            delete queryObj.maxPrice;
            this.modelQuery = this.modelQuery.find({ price: { $lte: this.query.maxPrice } } as FilterQuery<T>)
        }

        this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)

        return this;
    }

    sort() {
        const sort = (this?.query?.sort as string)?.split(",")?.join(" ") ?? '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort as string);

        return this;
    }
}

export default QueryBuilder;