import { LogicalOperator } from "./Types";
import { IFilterable } from "./IFilterable";
import { IFilterClause } from "./IFilterClause";
export interface IFilterGroup extends IFilterable {
    LogicalOperator: LogicalOperator;
    FilterClauses: IFilterClause[];
}
