import { PathExpression } from "./Query";

export class PathResolver<TEntity> {

  private readonly pathExtractor: RegExp;

  constructor() {
    this.pathExtractor = new RegExp("(\\.\\w*)+", "i");
  }

  public getPath<TEntity>(name: (t: TEntity) => any) {
    const match = this.pathExtractor.exec(name.toString());
    if (match == null) {
      throw new Error("The function does not contain a statement matching 'return variableName;'");
    }
    const result = match[0].substring(1);
    return result.split(".").join("/");
  }

  public resolve<TProperty, TValue> (expression: PathExpression<TEntity, TProperty, TValue>): string {
    if (this.isPathFactory(expression)) {
      return this.getPath(expression);
    } else {
      return expression.toString();
    }
  }

  private isPathFactory<TEntity, TProperty extends keyof TEntity, TValue>(arg: any): arg is PathExpression<TEntity, TProperty, TValue> {
    return typeof arg === "function" && arg as PathExpression<TEntity, TProperty, TValue> != null;
  }
}
