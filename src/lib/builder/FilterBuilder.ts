import * as moment from "moment";
import { IFilterClause } from "../models/IFilterClause";
import { IFilterGroup } from "../models/IFilterGroup";
import { IFilterable } from "../models/IFilterable";
import { FilterOperator, LogicalOperator, ODataFilterOperator, FilterValue } from "../models/Types";
import { CountByBuilder } from "./CountByBuilder";
import { GroupByBuilder } from "./GroupByBuilder";
import { OrderByBuilder } from "./OrderByBuilder";
import { PathResolver } from "./PathResolver";
import { PathExpression, Query } from "./Query";

const _Operators = new Map<FilterOperator, ODataFilterOperator>([
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

export class FilterBuilder<TEntity> {

    public get isEmpty(): boolean {
        return this._Clauses.length <= 0;
    }

    public get group(): GroupByBuilder<TEntity> {
        return this._Query.group;
    }

    public get order(): OrderByBuilder<TEntity> {
        return this._Query.order;
    }

    public get countBy(): CountByBuilder<TEntity> {
        return this._Query.countBy;
    }

    public get query() {
        return this._Query;
    }

    private _Clauses: IFilterable[] = [];
    private _PathResolver: PathResolver<TEntity>;
    constructor(private _Query: Query<TEntity>) {
        this._PathResolver = new PathResolver<TEntity>();
    }

    public add(...filterClauses: IFilterClause[]) {
        if (filterClauses.length > 0) {
            this._Clauses = [...this._Clauses, ...filterClauses];
        }
        return this;
    }

    public addGroup(...filterGroups: IFilterGroup[]) {
        if (filterGroups.length > 0) {
            this._Clauses = [...this._Clauses, ...filterGroups];
        }
        return this;
    }

    public and<TProperty, TValue>(path: PathExpression<TEntity, TProperty, TValue>, operator: FilterOperator, value: TValue): FilterBuilder<TEntity> {
        return this.filter("and", path, operator, value);
    }

    public or<TProperty extends keyof TEntity, TValue>(
        propertyExpression: PathExpression<TEntity, TProperty, TValue>,
        operator: FilterOperator,
        value: TValue): FilterBuilder<TEntity> {
        return this.filter("or", propertyExpression, operator, value);
    }

    public andBy(property: string, operator: FilterOperator, value: FilterValue): FilterBuilder<TEntity> {
        this.filterBy("and", property, operator, value);
        return this;
    }

    public count(value: boolean = true): FilterBuilder<TEntity> {
        this._Query.count();
        return this;
    }

    public toPartialString(): string {

        if (this.isEmpty) {
            return "";
        }

        const filters: string[] = [];

        this._Clauses.forEach((x, i) => {
            if (isFilterClause(x)) {
                const logicalOperator = i > 0 ? ` ${x.LogicalOperator} ` : "";
                filters.push(this.getStringifiedFilterClause(x, logicalOperator));
            } else {
                const group: string[] = [];
                const filterGroup = x as IFilterGroup;
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

    public top(value: number): Query<TEntity> {
        return this._Query.top(value);
    }

    public skip(value: number): Query<TEntity> {
        return this._Query.skip(value);
    }

    public toString() {
        return this._Query.toString();
    }

    private filter<TProperty, TValue> (
        logicalOperator: LogicalOperator,
        propertyExpression: PathExpression<TEntity, TProperty, TValue>,
        operator: FilterOperator,
        value: TValue): FilterBuilder<TEntity> {

        const propertyPath = this._PathResolver.resolve(propertyExpression);

        return this.filterBy(logicalOperator, propertyPath, operator, value);
    }

    private filterBy(logicalOperator: LogicalOperator, property: string, operator: FilterOperator, value: any): FilterBuilder<TEntity> {
        this._Clauses.push({ LogicalOperator: logicalOperator, Property: property, Operator: operator, Value: value } as IFilterClause);
        return this;
    }

    private getStringifiedFilterClause(x: IFilterClause, logicalOperator: string): string {
        let filter = "";
        if (x.Operator === "()" || x.Operator === "!()") {
            filter = this.getContainsFilterString(x, logicalOperator);
        } else if (x.Operator === "->()" || x.Operator === "!->()") {
            filter = this.getNavigationPropertyFilterString(x, logicalOperator);
        } else if (x.Operator === "d<" || x.Operator === "d>" || x.Operator === "d=" || x.Operator === "d>=" || x.Operator === "d<=") {
            filter = this.getDateFilterString(x, logicalOperator);
        } else {
            filter = this.getDefaultFilterString(x, logicalOperator);
        }

        return filter;
    }

    private getDefaultFilterString(x: IFilterClause, logicalOperator: string): string {
        let value = x.Value;
        if (typeof value === "string") {
            value = `'${x.Value}'`;
        }

        return `${logicalOperator}(${x.Property} ${_Operators.get(x.Operator)} ${value})`;
    }

    private getDateFilterString(x: IFilterClause, logicalOperator: string): string {
        const value = x.Value;
        if (value instanceof Date) {
            const date = moment(value);
            const stringifiedDate1 = encodeURIComponent(date.format("YYYY-MM-DDTHH:mm:ssZ"));

            if (x.Operator === "d<" || x.Operator === "d>" || x.Operator === "d<=" || x.Operator === "d>=") {
                return `${logicalOperator}(${x.Property} ${_Operators.get(x.Operator)} ${stringifiedDate1})`;
            } else {
                const y = date.add(1, "day");
                const stringifiedDate2 = encodeURIComponent(y.format("YYYY-MM-DDTHH:mm:ssZ"));
                return `${logicalOperator}(${x.Property} ge ${stringifiedDate1} and ${x.Property} lt ${stringifiedDate2})`;
            }
        }
        return "";
    }

    private getContainsFilterString(x: IFilterClause, logicalOperator: string): string {
        const value = `'${x.Value}'` || "''";
        return `${logicalOperator}(${_Operators.get(x.Operator)}(${x.Property}, ${value}))`;
    }

    private getNavigationPropertyFilterString(x: IFilterClause, logicalOperator: string): string {
        const value = `'${x.Value}'` || "''";
        return `${logicalOperator}${x.Property}/any(x: x/${x.PropertyKey} ${_Operators.get(x.Operator)} ${value})`;
    }
}

export function isFilterClause(obj: any): obj is IFilterClause {
    return (obj as IFilterClause).hasOwnProperty("Value");
}
