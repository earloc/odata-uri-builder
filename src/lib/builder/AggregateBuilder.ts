import { AggregateMethodBuilder, IAggregateMethodBuilder } from "./AggregateMethodBuilder";
import { GroupByBuilder } from "./GroupByBuilder";
import { PathResolver } from "./PathResolver";
import { Query, PathExpression } from "./Query";

export interface IAggregateBuilder<TEntity> {
  with: IAggregateMethodBuilder<TEntity>;
  as(alias: string): Query<TEntity>;
}

export class AggregateBuilder<TEntity> implements IAggregateBuilder<TEntity> {

  private _PathResolver: PathResolver<TEntity>;
  private _By!: string;
  private _With: AggregateMethodBuilder<TEntity>;

  public get with(): IAggregateMethodBuilder<TEntity> { return this._With; }
  public set with(value: IAggregateMethodBuilder<TEntity>) { throw new Error("setting 'with' is not supported"); }

  constructor(private _Query: Query<TEntity>, private _Group: GroupByBuilder<TEntity>) {
    this._PathResolver = new PathResolver<TEntity>();
    this._With = new AggregateMethodBuilder(_Query);
  }

  public by<TProperty extends keyof TEntity, TValue>(expressions: PathExpression<TEntity, TProperty, TValue>): IAggregateBuilder<TEntity> {
    return this.byCustom(this._PathResolver.resolve(expressions));
  }

  public byCustom(path: string): IAggregateBuilder<TEntity> {
    this._By = path;
    return this;
  }

  public as(alias: string) {
    this._With.as(alias);
    return this._Query;
  }

  public toPartialString() {
    let by = this._By;
    if (by === undefined) {
      by = "$count";
    }

    return `aggregate(${by}${this._With.toPartialString()})`;
  }

  public toString() {
    return this._Query.toString();
  }
}
