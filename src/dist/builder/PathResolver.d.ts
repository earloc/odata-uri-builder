import { PathExpression } from "./Query";
export declare class PathResolver<TEntity> {
    private readonly pathExtractor;
    constructor();
    getPath<TEntity>(name: (t: TEntity) => any): string;
    resolve<TProperty, TValue>(expression: PathExpression<TEntity, TProperty, TValue>): string;
    private isPathFactory;
}
