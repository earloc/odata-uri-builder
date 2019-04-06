import { Query, PathExpression } from "./Query";
export declare class CountByBuilder<TEntity> {
    private _Query;
    private _PathResolver;
    private _ByDay;
    readonly isEmpty: boolean;
    constructor(_Query: Query<TEntity>);
    dayOn<TProperty extends keyof TEntity, TValue>(expression: PathExpression<TEntity, TProperty, TValue>): Query<TEntity>;
    toPartialString(): string;
    toString(): string;
}
