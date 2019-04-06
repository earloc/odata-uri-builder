"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const PathResolver_1 = require("./PathResolver");
const _Operators = new Map([
    ["=", "eq"],
    ["!=", "ne"],
    ["<", "lt"],
    ["<=", "le"],
    [">", "gt"],
    [">=", "ge"],
    ["()", "contains"],
    ["!()", "notcontains"],
    ["->()", "eq"],
    ["!->()", "ne"],
    ["->", "startswith"],
    ["d<", "lt"],
    ["d>", "gt"],
    ["d=", "eq"],
    ["d>=", "ge"],
    ["d<=", "le"],
]);
class FilterBuilder {
    constructor(_Query) {
        this._Query = _Query;
        this._Clauses = [];
        this._PathResolver = new PathResolver_1.PathResolver();
    }
    get isEmpty() {
        return this._Clauses.length <= 0;
    }
    get group() {
        return this._Query.group;
    }
    get order() {
        return this._Query.order;
    }
    get countBy() {
        return this._Query.countBy;
    }
    get query() {
        return this._Query;
    }
    add(...filterClauses) {
        if (filterClauses.length > 0) {
            this._Clauses = [...this._Clauses, ...filterClauses];
        }
        return this;
    }
    addGroup(...filterGroups) {
        if (filterGroups.length > 0) {
            this._Clauses = [...this._Clauses, ...filterGroups];
        }
        return this;
    }
    and(path, operator, value) {
        return this.filter("and", path, operator, value);
    }
    or(propertyExpression, operator, value) {
        return this.filter("or", propertyExpression, operator, value);
    }
    andBy(property, operator, value) {
        this.filterBy("and", property, operator, value);
        return this;
    }
    count(value = true) {
        this._Query.count();
        return this;
    }
    toPartialString() {
        if (this.isEmpty) {
            return "";
        }
        const filters = [];
        this._Clauses.forEach((x, i) => {
            if (isFilterClause(x)) {
                const logicalOperator = i > 0 ? ` ${x.LogicalOperator} ` : "";
                filters.push(this.getStringifiedFilterClause(x, logicalOperator));
            }
            else {
                const group = [];
                const filterGroup = x;
                const outerLogicalOperator = i > 0 ? ` ${filterGroup.LogicalOperator} ` : "";
                filterGroup.FilterClauses.forEach((y, j) => {
                    const logicalOperator = j > 0 ? ` ${y.LogicalOperator} ` : "";
                    group.push(this.getStringifiedFilterClause(y, logicalOperator));
                });
                filters.push(`${outerLogicalOperator}(${group.join("")})`);
            }
        });
        const filter = filters.join("");
        return filter;
    }
    top(value) {
        return this._Query.top(value);
    }
    skip(value) {
        return this._Query.skip(value);
    }
    toString() {
        return this._Query.toString();
    }
    filter(logicalOperator, propertyExpression, operator, value) {
        const propertyPath = this._PathResolver.resolve(propertyExpression);
        return this.filterBy(logicalOperator, propertyPath, operator, value);
    }
    filterBy(logicalOperator, property, operator, value) {
        this._Clauses.push({ LogicalOperator: logicalOperator, Property: property, Operator: operator, Value: value });
        return this;
    }
    getStringifiedFilterClause(x, logicalOperator) {
        let filter = "";
        if (x.Operator === "()" || x.Operator === "!()") {
            filter = this.getContainsFilterString(x, logicalOperator);
        }
        else if (x.Operator === "->()" || x.Operator === "!->()") {
            filter = this.getNavigationPropertyFilterString(x, logicalOperator);
        }
        else if (x.Operator === "d<" || x.Operator === "d>" || x.Operator === "d=" || x.Operator === "d>=" || x.Operator === "d<=") {
            filter = this.getDateFilterString(x, logicalOperator);
        }
        else {
            filter = this.getDefaultFilterString(x, logicalOperator);
        }
        return filter;
    }
    getDefaultFilterString(x, logicalOperator) {
        let value = x.Value;
        if (typeof value === "string") {
            value = `'${x.Value}'`;
        }
        return `${logicalOperator}(${x.Property} ${_Operators.get(x.Operator)} ${value})`;
    }
    getDateFilterString(x, logicalOperator) {
        const value = x.Value;
        if (value instanceof Date) {
            const date = moment(value);
            const stringifiedDate1 = encodeURIComponent(date.format("YYYY-MM-DDTHH:mm:ssZ"));
            if (x.Operator === "d<" || x.Operator === "d>" || x.Operator === "d<=" || x.Operator === "d>=") {
                return `${logicalOperator}(${x.Property} ${_Operators.get(x.Operator)} ${stringifiedDate1})`;
            }
            else {
                const y = date.add(1, "day");
                const stringifiedDate2 = encodeURIComponent(y.format("YYYY-MM-DDTHH:mm:ssZ"));
                return `${logicalOperator}(${x.Property} ge ${stringifiedDate1} and ${x.Property} lt ${stringifiedDate2})`;
            }
        }
        return "";
    }
    getContainsFilterString(x, logicalOperator) {
        const value = `'${x.Value}'` || "''";
        return `${logicalOperator}(${_Operators.get(x.Operator)}(${x.Property}, ${value}))`;
    }
    getNavigationPropertyFilterString(x, logicalOperator) {
        const value = `'${x.Value}'` || "''";
        return `${logicalOperator}${x.Property}/any(x: x/${x.PropertyKey} ${_Operators.get(x.Operator)} ${value})`;
    }
}
exports.FilterBuilder = FilterBuilder;
function isFilterClause(obj) {
    return obj.hasOwnProperty("Value");
}
exports.isFilterClause = isFilterClause;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsdGVyQnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9idWlsZGVyL0ZpbHRlckJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBaUM7QUFRakMsaURBQThDO0FBRzlDLE1BQU0sVUFBVSxHQUFHLElBQUksR0FBRyxDQUFzQztJQUM1RCxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7SUFDWCxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7SUFDWixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7SUFDWCxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7SUFDWixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7SUFDWCxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7SUFDWixDQUFDLElBQUksRUFBRSxVQUFVLENBQUM7SUFDbEIsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDO0lBQ3RCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQztJQUNkLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQztJQUNmLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQztJQUNwQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7SUFDWixDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7SUFDWixDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7SUFDWixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUM7SUFDYixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUM7Q0FDaEIsQ0FBQyxDQUFDO0FBRUgsTUFBYSxhQUFhO0lBd0J0QixZQUFvQixNQUFzQjtRQUF0QixXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUZsQyxhQUFRLEdBQWtCLEVBQUUsQ0FBQztRQUdqQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksMkJBQVksRUFBVyxDQUFDO0lBQ3JELENBQUM7SUF4QkQsSUFBVyxPQUFPO1FBQ2QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLENB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