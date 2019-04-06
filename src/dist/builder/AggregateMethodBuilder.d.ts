import { Query } from "./Query";
export declare type AggregateMethod = "min" | "max" | "sum" | "average";
export interface IAggregateMethodBuilder<TEntity> {
    minAs(alias: string): Query<TEntity>;
    maxAs(alias: string): Query<TEntity>;
    sumAs(alias: string): Query<TEntity>;
    averageAs(alias: string): Query<TEntity>;
    with(method: AggregateMethod, alias: string): Query<TEntity>;
}
export declare class AggregateMethodBuilder<TEntity> {
    private _Query;
    private _With?;
    private _Alias;
    constructor(_Query: Query<TEntity>);
    as(alias: string): Query<TEntity>;
    minAs(alias: string): Query<TEntity>;
    maxAs(alias: string): Query<TEntity>;
    sumAs(alias: string): Query<TEntity>;
    averageAs(alias: string): Query<TEntity>;
    with(method: AggregateMethod, alias: string): Query<TEntity>;
    toPartialString(): string;
    toString(): string;
}
