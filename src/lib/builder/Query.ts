import { IFilterClause } from "../models/IFilterClause";
import { FilterOperator, FilterValue } from "../models/Types";
import { CountByBuilder } from "./CountByBuilder";
import { ExpandBuilder } from "./ExpandBuilder";
import { FilterBuilder } from "./FilterBuilder";
import { GroupByBuilder } from "./GroupByBuilder";
import { OrderByBuilder } from "./OrderByBuilder";
import { SelectBuilder } from "./SelectBuilder";

export type PathExpression<TEntity, TProperty, TValue> = ((p: TEntity) => TValue) | TProperty;

export class Query<TEntity> {

    public get group(): GroupByBuilder<TEntity> { return this._Group; }
    public get order(): OrderByBuilder<TEntity> { return this._Order; }
    public get countBy(): CountByBuilder<TEntity> { return this._CountBy; }

    private get usesQueryString() {
        return !(this._Filter.isEmpty && this._Group.isEmpty);
    }

    protected parts: string[] = [];

    private _Filter: FilterBuilder<TEntity>;
    private _Group: GroupByBuilder<TEntity>;
    private _Order: OrderByBuilder<TEntity>;
    private _Expand: ExpandBuilder<TEntity>;
    private _Select: SelectBuilder<TEntity>;
    private _CountBy: CountByBuilder<TEntity>;
    private _Count = false;
    private _IncludeTotalCount = false;
    private _Top?: number;
    private _Skip?: number;

    constructor(entitySet: string, pluralize = true) {
        this._Filter = new FilterBuilder(this);
        this._Group = new GroupByBuilder(this);
        this._Order = new OrderByBuilder(this);
        this._Expand = new ExpandBuilder(this);
        this._Select = new SelectBuilder(this);
        this._CountBy = new CountByBuilder(this);

        if (pluralize) {
            entitySet = this.pluralize(entitySet);
        }

        this.parts.push(entitySet);
    }

    public filter<TProperty, TValue>(path: ((p : TEntity) => TValue), operator: FilterOperator, value: TValue) : FilterBuilder<TEntity>;
    public filter<TProperty extends keyof TEntity, TValue extends TEntity[TProperty]>(path: TProperty , operator: FilterOperator, value: TValue) : FilterBuilder<TEntity>;
    public filter<TProperty, TValue>(path: TProperty , operator: FilterOperator, value: TValue) : FilterBuilder<TEntity> {
        return this._Filter.and(path, operator, value);
    }

    public filterCustom(path: string, operator: FilterOperator, value: FilterValue): FilterBuilder<TEntity> {
        return this._Filter.andBy(path, operator, value);
    }

    public addFilterClauses(...filterClauses: IFilterClause[]) {
        return this._Filter.add(...filterClauses);
    }

    public expand<TProperty extends keyof TEntity, TValue>(...expressions: Array<PathExpression<TEntity, TProperty, TValue>>): Query<TEntity> {
        this._Expand = this._Expand.by(expressions);
        return this;
    }

    public expandCustom(...paths: string[]): Query<TEntity> {
        this._Expand = this._Expand.byCustom(paths);
        return this;
    }

    public select<TProperty extends keyof TEntity, TValue>(...expressions: Array<PathExpression<TEntity, TProperty, TValue>>): Query<TEntity> {
        this._Select = this._Select.by(expressions);
        return this;
    }

    public selectCustom(...paths: string[]): Query<TEntity> {
        this._Select = this._Select.byCustom(paths);
        return this;
    }

    public count(value: boolean = true): Query<TEntity> {
        this._Count = value;
        return this;
    }

    public includeTotalCount(): Query<TEntity> {
        this._IncludeTotalCount = true;
        return this;
    }

    public top(value: number): Query<TEntity> {
        this._Top = value;
        return this;
    }

    public skip(value: number): Query<TEntity> {
        this._Skip = value;
        return this;
    }

    public toString(includeQueryString = true): string {

        const parts = [...this.parts];

        if (this._Count) {
            parts.push("/$count");
        }

        const queryStringParts: string[] = [];

        if (!this._CountBy.isEmpty) {
            const countByDay = this._CountBy.toPartialString();
            parts.push(countByDay);
        }

        if (includeQueryString) {

            if (!this._Group.isEmpty) {
                const applyParts: string[] = [];

                if (!this._Filter.isEmpty) {
                    applyParts.push(`filter(${this._Filter.toPartialString()})`);
                }

                applyParts.push(`${this._Group.toPartialString()}`);
                const apply = applyParts.join("/");

                queryStringParts.push(`$apply=${apply}`);
            } else {
                if (!this._Filter.isEmpty) {
                    queryStringParts.push(`$filter=${this._Filter.toPartialString()}`);
                }
                if (!this._Expand.isEmpty) {
                    queryStringParts.push(`$expand=${this._Expand.toPartialString()}`);
                }
                if (!this._Select.isEmpty) {
                    queryStringParts.push(`$select=${this._Select.toPartialString()}`);
                }

            }

            if (this.usesQueryString || parts.length === 1) {
                parts.push("?");
            }

            if (this._IncludeTotalCount) {
                queryStringParts.push("$count=true");
            }

            if (!this._Order.isEmpty) {
                queryStringParts.push(this._Order.toPartialString());
            }

            if (this._Skip !== undefined) {
                queryStringParts.push(`$skip=${this._Skip}`);
            }

            if (this._Top !== undefined) {
                queryStringParts.push(`$top=${this._Top}`);
            }

            parts.push(queryStringParts.join("&"));
        }

        return parts.join("");
    }

    public toUri(includeQueryString = true): string {
        return encodeURI(this.toString(includeQueryString));
    }

    private pluralize(x: string) {
        if (x.endsWith("s")) { // e.g.: Species -> Species
            return x;
        }

        if (x.endsWith("y")) { // e.g.: Country -> Countries
            return x.substring(0, x.length - 1) + "ies";
        }

        return x + "s"; // e.g.: Product -> Products, Event -> Events
    }
}
