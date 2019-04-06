import { IAggregateBuilder } from "./AggregateBuilder";
import { Query, PathExpression } from "./Query";
export declare class GroupByBuilder<TEntity> {
    private _Query;
    private _PathResolver;
    private _Aggregate;
    private _GroupBy;
    readonly isEmpty: boolean;
    constructor(_Query: Query<TEntity>);
    by<TProperty extends keyof TEntity, TValue>(...expressions: Array<PathExpression<TEntity, TProperty, TValue>>): GroupByBuilder<TEntity>;
    byCustom(...paths: string[]): GroupByBuilder<TEntity>;
    aggregate<TProperty extends keyof TEntity, TValue>(expression: PathExpression<TEntity, TProperty, TValue>): IAggregateBuilder<TEntity>;
    aggregateCount(): Query<TEntity>;
    aggregateCustom(path: string): IAggregateBuilder<TEntity>;
    toPartialString(): string;
    toString(): string;
}
