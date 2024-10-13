"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var QueryBuilder = /** @class */ (function () {
    function QueryBuilder(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    QueryBuilder.prototype.search = function (searchableFields) {
        var _a;
        var searchTerm = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.searchTerm;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map(function (field) {
                    var _a;
                    return (_a = {},
                        _a[field] = {
                            $regex: searchTerm,
                            $options: 'i'
                        },
                        _a);
                })
            });
        }
        return this;
    };
    QueryBuilder.prototype.filter = function () {
        var _a, _b, _c, _d;
        // creating a query object so that direct value filters can be done with that. The fields that needs to be handled separately needs to be deleted from the query object and handle separately e.g. tags, minPrice, maxPrice.
        var queryObj = __assign({}, this.query);
        if (queryObj === null || queryObj === void 0 ? void 0 : queryObj.serviceId) {
            queryObj.service = queryObj.serviceId;
            delete queryObj.serviceId;
        }
        if (queryObj.sort) {
            delete queryObj.sort;
        }
        if (queryObj.searchTerm) {
            delete queryObj.searchTerm;
        }
        var tags = (_b = (_a = this.query) === null || _a === void 0 ? void 0 : _a.tags) === null || _b === void 0 ? void 0 : _b.split(",");
        if (tags === null || tags === void 0 ? void 0 : tags.length) {
            delete queryObj.tags;
            this.modelQuery = this.modelQuery.find({ tags: { $all: tags } });
        }
        if ((_c = this.query) === null || _c === void 0 ? void 0 : _c.minPrice) {
            delete queryObj.minPrice;
            this.modelQuery = this.modelQuery.find({ price: { $gte: this.query.minPrice } });
        }
        if ((_d = this.query) === null || _d === void 0 ? void 0 : _d.maxPrice) {
            delete queryObj.maxPrice;
            this.modelQuery = this.modelQuery.find({ price: { $lte: this.query.maxPrice } });
        }
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    };
    QueryBuilder.prototype.sort = function () {
        var _a, _b, _c, _d;
        var sort = (_d = (_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sort) === null || _b === void 0 ? void 0 : _b.split(",")) === null || _c === void 0 ? void 0 : _c.join(" ")) !== null && _d !== void 0 ? _d : '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    };
    return QueryBuilder;
}());
exports.default = QueryBuilder;
