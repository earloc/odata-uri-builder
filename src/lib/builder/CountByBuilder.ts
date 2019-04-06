import { PathResolver } from "./PathResolver";
import { Query, PathExpression } from "./Query";

export class CountByBuilder<TEntity> {

  private _PathResolver: PathResolver<TEntity>;
  private _ByDay = "";

  public get isEmpty() {
    return this._ByDay === "";
  }

  constructor(private _Query: Query<TEntity>) {
    this._PathResolver = new PathResolver<TEntity>();
  }

  public dayOn<TProperty extends keyof TEntity, TValue>(expression: PathExpression<TEntity, TProperty, TValue>): Query<TEntity> {
    this._ByDay = this._PathResolver.resolve(expression);
    return this._Query;
  }

  public toPartialString() {
    return `/count.byDay(on='${this._ByDay}')/`;
  }

  public toString() {
    return this._Query.toString();
  }
}
