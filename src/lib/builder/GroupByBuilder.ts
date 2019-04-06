import { AggregateBuilder, IAggregateBuilder } from "./AggregateBuilder";
import { PathResolver } from "./PathResolver";
import { Query, PathExpression } from "./Query";

export class GroupByBuilder<TEntity> {

  private _PathResolver: PathResolver<TEntity>;
  private _Aggregate: AggregateBuilder<TEntity>;
  private _GroupBy: string[] = [];

  public get isEmpty() {
    return this._GroupBy.length <= 0;
  }

  constructor(private _Query: Query<TEntity>) {
    this._PathResolver = new PathResolver<TEntity>();
    this._Aggregate = new AggregateBuilder(_Query, this);
  }

  public by<TProperty extends keyof TEntity, TValue>(...expressions: Array<PathExpression<TEntity, TProperty, TValue>>): GroupByBuilder<TEntity> {
    const paths = expressions.map((x) => this._PathResolver.resolve(x));

    this._GroupBy = [...this._GroupBy, ...paths];
    return this;
  }

  public byCustom(...paths: string[]): GroupByBuilder<TEntity> {
    this._GroupBy = [...this._GroupBy, ...paths];
    return this;
  }

  public aggregate<TProperty extends keyof TEntity, TValue>(expression: PathExpression<TEntity, TProperty, TValue>): IAggregateBuilder<TEntity> {
    return this._Aggregate.by(expression);
  }
  public aggregateCount(): Query<TEntity> {
    return this._Aggregate.byCustom("$count").as("Count");
  }
  public aggregateCustom(path: string): IAggregateBuilder<TEntity> {
    return this._Aggregate.byCustom(path);
  }

  public toPartialString() {
    if (!this.isEmpty) {
      const groupBy = this._GroupBy.join(",");
      const aggregate = this._Aggregate.toPartialString();
      return `groupby((${groupBy}), ${aggregate})`;
    } else {
      return "";
    }
  }

  public toString() {
    return this._Query.toString();
  }
}
