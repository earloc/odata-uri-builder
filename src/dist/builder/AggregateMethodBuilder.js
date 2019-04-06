"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AggregateMethodBuilder {
    constructor(_Query) {
        this._Query = _Query;
    }
    as(alias) {
        this._Alias = alias;
        return this._Query;
    }
    minAs(alias) { return this.with("min", alias); }
    maxAs(alias) { return this.with("max", alias); }
    sumAs(alias) { return this.with("sum", alias); }
    averageAs(alias) { return this.with("average", alias); }
    with(method, alias) {
        this._With = method;
        this._Alias = alias;
        return this._Query;
    }
    toPartialString() {
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
    toString() {
        return this._Query.toString();
    }
}
exports.AggregateMethodBuilder = AggregateMethodBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWdncmVnYXRlTWV0aG9kQnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9idWlsZGVyL0FnZ3JlZ2F0ZU1ldGhvZEJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFZQSxNQUFhLHNCQUFzQjtJQUtqQyxZQUFvQixNQUFzQjtRQUF0QixXQUFNLEdBQU4sTUFBTSxDQUFnQjtJQUMxQyxDQUFDO0lBRU0sRUFBRSxDQUFDLEtBQWE7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxLQUFLLENBQUMsS0FBYSxJQUFvQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxLQUFLLENBQUMsS0FBYSxJQUFvQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxLQUFLLENBQUMsS0FBYSxJQUFvQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxTQUFTLENBQUMsS0FBYSxJQUFvQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVoRixJQUFJLENBQUMsTUFBdUIsRUFBRSxLQUFhO1FBQ2hELElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRXBCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRU0sZUFBZTtRQUNwQixJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDbkIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsUUFBUSxHQUFHLFNBQVMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDO1NBQ25DO1FBRUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN4QixJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDdkIsS0FBSyxHQUFHLE9BQU8sQ0FBQztTQUNqQjtRQUVELE9BQU8sR0FBRyxRQUFRLE1BQU0sS0FBSyxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVNLFFBQVE7UUFDYixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDaEMsQ0FBQztDQUNGO0FBMUNELHdEQTBDQyJ9