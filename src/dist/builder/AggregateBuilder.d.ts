import { IAggregateMethodBuilder } from "./AggregateMethodBuilder";
import { GroupByBuilder } from "./GroupByBuilder";
import { Query, PathExpression } from "./Query";
export interface IAggregateBuilder<TEntity> {
    with: IAggregateMethodBuilder<TEntity>;
    as(alias: string): Query<TEntity>;
}
export declare class AggregateBuilder<TEntity> implements IAggregateBuilder<TEntity> {
    private _Query;
    private _Group;
    private _PathResolver;
    private _By;
    private _With;
    with: IAggregateMethodBuilder<TEntity>;
    constructor(_Query: Query<TEntity>, _Group: GroupByBuilder<TEntity>);
    by<TProperty extends keyof TEntity, TValue>(expressions: PathExpression<TEntity, TProperty, TValue>): IAggregateBuilder<TEntity>;
    byCustom(path: string): IAggregateBuilder<TEntity>;
    as(alias: string): Query<TEntity>;
    toPartialString(): string;
    toString(): string;
}
