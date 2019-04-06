"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CountByBuilder_1 = require("./CountByBuilder");
const ExpandBuilder_1 = require("./ExpandBuilder");
const FilterBuilder_1 = require("./FilterBuilder");
const GroupByBuilder_1 = require("./GroupByBuilder");
const OrderByBuilder_1 = require("./OrderByBuilder");
const SelectBuilder_1 = require("./SelectBuilder");
class Query {
    constructor(entitySet, pluralize = true) {
        this.parts = [];
        this._Count = false;
        this._IncludeTotalCount = false;
        this._Filter = new FilterBuilder_1.FilterBuilder(this);
        this._Group = new GroupByBuilder_1.GroupByBuilder(this);
        this._Order = new OrderByBuilder_1.OrderByBuilder(this);
        this._Expand = new ExpandBuilder_1.ExpandBuilder(this);
        this._Select = new SelectBuilder_1.SelectBuilder(this);
        this._CountBy = new CountByBuilder_1.CountByBuilder(this);
        if (pluralize) {
            entitySet = this.pluralize(entitySet);
        }
        this.parts.push(entitySet);
    }
    get group() { return this._Group; }
    get order() { return this._Order; }
    get countBy() { return this._CountBy; }
    get usesQueryString() {
        return !(this._Filter.isEmpty && this._Group.isEmpty);
    }
    filter(path, operator, value) {
        return this._Filter.and(path, operator, value);
    }
    filterCustom(path, operator, value) {
        return this._Filter.andBy(path, operator, value);
    }
    addFilterClauses(...filterClauses) {
        return this._Filter.add(...filterClauses);
    }
    expand(...expressions) {
        this._Expand = this._Expand.by(expressions);
        return this;
    }
    expandCustom(...paths) {
        this._Expand = this._Expand.byCustom(paths);
        return this;
    }
    select(...expressions) {
        this._Select = this._Select.by(expressions);
        return this;
    }
    selectCustom(...paths) {
        this._Select = this._Select.byCustom(paths);
        return this;
    }
    count(value = true) {
        this._Count = value;
        return this;
    }
    includeTotalCount() {
        this._IncludeTotalCount = true;
        return this;
    }
    top(value) {
        this._Top = value;
        return this;
    }
    skip(value) {
        this._Skip = value;
        return this;
    }
    toString(includeQueryString = true) {
        const parts = [...this.parts];
        if (this._Count) {
            parts.push("/$count");
        }
        const queryStringParts = [];
        if (!this._CountBy.isEmpty) {
            const countByDay = this._CountBy.toPartialString();
            parts.push(countByDay);
        }
        if (includeQueryString) {
            if (!this._Group.isEmpty) {
                const applyParts = [];
                if (!this._Filter.isEmpty) {
                    applyParts.push(`filter(${this._Filter.toPartialString()})`);
                }
                applyParts.push(`${this._Group.toPartialString()}`);
                const apply = applyParts.join("/");
                queryStringParts.push(`$apply=${apply}`);
            }
            else {
                if (!this._Filter.isEmpty) {
                    queryStringParts.push(`$filter=${this._Filter.toPartialString()}`);
                }
                if (!this._Expand.isEmpty) {
                    queryStringParts.push(`$expand=${this._Expand.toPartialString()}`);
                }
                if (!this._Select.isEmpty) {
                    queryStringParts.push(`$select=${this._Select.toPartialString()}`);
                }
            }
            if (this.usesQueryString || parts.length === 1) {
                parts.push("?");
            }
            if (this._IncludeTotalCount) {
                queryStringParts.push("$count=true");
            }
            if (!this._Order.isEmpty) {
                queryStringParts.push(this._Order.toPartialString());
            }
            if (this._Skip !== undefined) {
                queryStringParts.push(`$skip=${this._Skip}`);
            }
            if (this._Top !== undefined) {
                queryStringParts.push(`$top=${this._Top}`);
            }
            parts.push(queryStringParts.join("&"));
        }
        return parts.join("");
    }
    toUri(includeQueryString = true) {
        return encodeURI(this.toString(includeQueryString));
    }
    pluralize(x) {
        if (x.endsWith("s")) { // e.g.: Species -> Species
            return x;
        }
        if (x.endsWith("y")) { // e.g.: Country -> Countries
            return x.substring(0, x.length - 1) + "ies";
        }
        return x + "s"; // e.g.: Product -> Products, Event -> Events
    }
}
exports.Query = Query;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvYnVpbGRlci9RdWVyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLHFEQUFrRDtBQUNsRCxtREFBZ0Q7QUFDaEQsbURBQWdEO0FBQ2hELHFEQUFrRDtBQUNsRCxxREFBa0Q7QUFDbEQsbURBQWdEO0FBSWhELE1BQWEsS0FBSztJQXVCZCxZQUFZLFNBQWlCLEVBQUUsU0FBUyxHQUFHLElBQUk7UUFickMsVUFBSyxHQUFhLEVBQUUsQ0FBQztRQVF2QixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBSy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSw2QkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSwrQkFBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSwrQkFBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSw2QkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSw2QkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSwrQkFBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXpDLElBQUksU0FBUyxFQUFFO1lBQ1gsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDekM7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBbENELElBQVcsS0FBSyxLQUE4QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ25FLElBQVcsS0FBSyxLQUE4QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ25FLElBQVcsT0FBTyxLQUE4QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBRXZFLElBQVksZUFBZTtRQUN2QixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFnQ00sTUFBTSxDQUFvQixJQUFlLEVBQUcsUUFBd0IsRUFBRSxLQUFhO1FBQ3RGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRU0sWUFBWSxDQUFDLElBQVksRUFBRSxRQUF3QixFQUFFLEtBQWtCO1FBQzFFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRU0sZ0JBQWdCLENBQUMsR0FBRyxhQUE4QjtRQUNyRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVNLE1BQU0sQ0FBMEMsR0FBRyxXQUE4RDtRQUNwSCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxZQUFZLENBQUMsR0FBRyxLQUFlO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLE1BQU0sQ0FBMEMsR0FBRyxXQUE4RDtRQUNwSCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxZQUFZLENBQUMsR0FBRyxLQUFlO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLEtBQUssQ0FBQyxRQUFpQixJQUFJO1FBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxpQkFBaUI7UUFDcEIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztRQUMvQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sR0FBRyxDQUFDLEtBQWE7UUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDbEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLElBQUksQ0FBQyxLQUFhO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxRQUFRLENBQUMsa0JBQWtCLEdBQUcsSUFBSTtRQUVyQyxNQUFNLEtBQUssR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTlCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDekI7UUFFRCxNQUFNLGdCQUFnQixHQUFhLEVBQUUsQ0FBQztRQUV0QyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDeEIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUNuRCxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzFCO1FBRUQsSUFBSSxrQkFBa0IsRUFBRTtZQUVwQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7Z0JBQ3RCLE1BQU0sVUFBVSxHQUFhLEVBQUUsQ0FBQztnQkFFaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO29CQUN2QixVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLENBQUM7aUJBQ2hFO2dCQUVELFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDcEQsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFbkMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxFQUFFLENBQUMsQ0FBQzthQUM1QztpQkFBTTtnQkFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7b0JBQ3ZCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUN0RTtnQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7b0JBQ3ZCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUN0RTtnQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7b0JBQ3ZCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUN0RTthQUVKO1lBRUQsSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUM1QyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ25CO1lBRUQsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7Z0JBQ3pCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUN4QztZQUVELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtnQkFDdEIsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQzthQUN4RDtZQUVELElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7Z0JBQzFCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2FBQ2hEO1lBRUQsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtnQkFDekIsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7YUFDOUM7WUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzFDO1FBRUQsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTSxLQUFLLENBQUMsa0JBQWtCLEdBQUcsSUFBSTtRQUNsQyxPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRU8sU0FBUyxDQUFDLENBQVM7UUFDdkIsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsMkJBQTJCO1lBQzlDLE9BQU8sQ0FBQyxDQUFDO1NBQ1o7UUFFRCxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSw2QkFBNkI7WUFDaEQsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUMvQztRQUVELE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLDZDQUE2QztJQUNqRSxDQUFDO0NBQ0o7QUE5S0Qsc0JBOEtDIn0=