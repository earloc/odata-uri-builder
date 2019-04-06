import { Query, PathExpression } from "./Query";
export declare type OrderDirection = "asc" | "desc";
export declare class OrderByBuilder<TEntity> {
    private _Query;
    private _PathResolver;
    private _OrderBy;
    readonly isEmpty: boolean;
    constructor(_Query: Query<TEntity>);
    by<TProperty extends keyof TEntity, TValue>(expression: PathExpression<TEntity, TProperty, TValue>, direction?: OrderDirection): Query<TEntity>;
    byCustom(path: string, direction?: OrderDirection): Query<TEntity>;
    toPartialString(): string;
    toString(): string;
}
