import { Query } from "./Query";

export type AggregateMethod = "min" | "max" | "sum" | "average";

export interface IAggregateMethodBuilder<TEntity> {
  minAs(alias: string): Query<TEntity>;
  maxAs(alias: string): Query<TEntity>;
  sumAs(alias: string): Query<TEntity>;
  averageAs(alias: string): Query<TEntity>;
  with(method: AggregateMethod, alias: string): Query<TEntity>;
}

export class AggregateMethodBuilder<TEntity> {

  private _With?: AggregateMethod;
  private _Alias!: string;

  constructor(private _Query: Query<TEntity>) {
  }

  public as(alias: string): Query<TEntity> {
    this._Alias = alias;
    return this._Query;
  }

  public minAs(alias: string): Query<TEntity> { return this.with("min", alias); }
  public maxAs(alias: string): Query<TEntity> { return this.with("max", alias); }
  public sumAs(alias: string): Query<TEntity> { return this.with("sum", alias); }
  public averageAs(alias: string): Query<TEntity> { return this.with("average", alias); }

  public with(method: AggregateMethod, alias: string): Query<TEntity> {
    this._With = method;
    this._Alias = alias;

    return this._Query;
  }

  public toPartialString() {
    let withPart = " ";
    if (this._With) {
      withPart = ` with ${this._With} `;
    }

    let alias = this._Alias;
    if (alias === undefined) {
      alias = "Count";
    }

    return `${withPart}as ${alias}`;
  }

  public toString() {
    return this._Query.toString();
  }
}
