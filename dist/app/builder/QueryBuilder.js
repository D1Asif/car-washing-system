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
    QueryBuilder.prototype.filter = function () {
        var queryObj = __assign({}, this.query);
        if (queryObj === null || queryObj === void 0 ? void 0 : queryObj.serviceId) {
            queryObj.service = queryObj.serviceId;
            delete queryObj.serviceId;
        }
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    };
    return QueryBuilder;
}());
exports.default = QueryBuilder;
