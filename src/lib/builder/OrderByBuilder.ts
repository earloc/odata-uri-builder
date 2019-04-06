import { PathResolver } from "./PathResolver";
import { Query, PathExpression } from "./Query";

export type OrderDirection = "asc" | "desc";

interface IOrderBy {
  path: string;
  direction: OrderDirection;
}

export class OrderByBuilder<TEntity> {

  private _PathResolver: PathResolver<TEntity>;
  private _OrderBy: IOrderBy[] = [];

  public get isEmpty() {
    return this._OrderBy.length <= 0;
  }

  constructor(private _Query: Query<TEntity>) {
    this._PathResolver = new PathResolver<TEntity>();
  }

  public by<TProperty extends keyof TEntity, TValue>(expression: PathExpression<TEntity, TProperty, TValue>, direction: OrderDirection = "asc"): Query<TEntity> {
    const path = this._PathResolver.resolve(expression);
    return this.byCustom(path, direction);
  }

  public byCustom(path: string, direction: OrderDirection = "asc"): Query<TEntity> {
    this._OrderBy.push({ direction, path });
    return this._Query;
  }

  public toPartialString() {
    const orderBy = this._OrderBy
      .map((x) => `${x.path} ${x.direction}`)
      .join(",");

    return `$orderby=${orderBy}`;
  }

  public toString() {
    return this._Query.toString();
  }
}
