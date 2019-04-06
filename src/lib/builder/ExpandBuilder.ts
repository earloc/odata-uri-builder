import { PathResolver } from "./PathResolver";
import { Query, PathExpression } from "./Query";

export class ExpandBuilder<TEntity> {

  private _PathResolver: PathResolver<TEntity>;
  private _Properties: string[] = [];

  public get isEmpty() {
    return this._Properties.length <= 0;
  }

  constructor(private _Query: Query<TEntity>) {
    this._PathResolver = new PathResolver<TEntity>();
  }

  public by<TProperty extends keyof TEntity, TValue>(expressions: Array<PathExpression<TEntity, TProperty, TValue>>): ExpandBuilder<TEntity> {
    const paths = expressions.map((x) => this._PathResolver.resolve(x));

    this._Properties = [...this._Properties, ...paths];
    return this;
  }

  public byCustom(paths: string[]): ExpandBuilder<TEntity> {
    this._Properties = [...this._Properties, ...paths];
    return this;
  }

  public toPartialString() {
    return this._Properties.join(",");
  }

  public toString() {
    return this._Query.toString();
  }
}
