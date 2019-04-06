import { Query, PathExpression } from "./Query";
export declare class ExpandBuilder<TEntity> {
    private _Query;
    private _PathResolver;
    private _Properties;
    readonly isEmpty: boolean;
    constructor(_Query: Query<TEntity>);
    by<TProperty extends keyof TEntity, TValue>(expressions: Array<PathExpression<TEntity, TProperty, TValue>>): ExpandBuilder<TEntity>;
    byCustom(paths: string[]): ExpandBuilder<TEntity>;
    toPartialString(): string;
    toString(): string;
}
