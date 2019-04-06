import { FilterOperator, LogicalOperator, FilterValue } from "./Types";
import { IFilterable } from "./IFilterable";
export interface IFilterClause extends IFilterable {
    PropertyKey?: string; // Property of navigationproperty
    Property: string;
    Operator: FilterOperator;
    Value: FilterValue;
    LogicalOperator: LogicalOperator;
}
