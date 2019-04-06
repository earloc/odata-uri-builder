export type FilterValue = string | Date | number | boolean | null;
export type LogicalOperator = "" | "and" | "or";
export type FilterOperator = "=" | "!=" | "<" | "<=" | ">" | ">=" | "()" | "!()" | "->()" | "!->()" | "->" | "d<" | "d>" | "d=" | "d>=" | "d<=";
export type ODataFilterOperator = "eq" | "ne" | "lt" | "le" | "gt" | "ge" | "contains" | "notcontains" | "startswith";  
