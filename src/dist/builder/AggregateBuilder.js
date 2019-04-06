"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AggregateMethodBuilder_1 = require("./AggregateMethodBuilder");
const PathResolver_1 = require("./PathResolver");
class AggregateBuilder {
    constructor(_Query, _Group) {
        this._Query = _Query;
        this._Group = _Group;
        this._PathResolver = new PathResolver_1.PathResolver();
        this._With = new AggregateMethodBuilder_1.AggregateMethodBuilder(_Query);
    }
    get with() { return this._With; }
    set with(value) { throw new Error("setting 'with' is not supported"); }
    by(expressions) {
        return this.byCustom(this._PathResolver.resolve(expressions));
    }
    byCustom(path) {
        this._By = path;
        return this;
    }
    as(alias) {
        this._With.as(alias);
        return this._Query;
    }
    toPartialString() {
        let by = this._By;
        if (by === undefined) {
            by = "$count";
        }
        return `aggregate(${by}${this._With.toPartialString()})`;
    }
    toString() {
        return this._Query.toString();
    }
}
exports.AggregateBuilder = AggregateBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWdncmVnYXRlQnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9idWlsZGVyL0FnZ3JlZ2F0ZUJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxRUFBMkY7QUFFM0YsaURBQThDO0FBUTlDLE1BQWEsZ0JBQWdCO0lBUzNCLFlBQW9CLE1BQXNCLEVBQVUsTUFBK0I7UUFBL0QsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUF5QjtRQUNqRixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksMkJBQVksRUFBVyxDQUFDO1FBQ2pELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSwrQ0FBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBTkQsSUFBVyxJQUFJLEtBQXVDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDMUUsSUFBVyxJQUFJLENBQUMsS0FBdUMsSUFBSSxNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBT3pHLEVBQUUsQ0FBMEMsV0FBdUQ7UUFDeEcsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVNLFFBQVEsQ0FBQyxJQUFZO1FBQzFCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVNLEVBQUUsQ0FBQyxLQUFhO1FBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRU0sZUFBZTtRQUNwQixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ2xCLElBQUksRUFBRSxLQUFLLFNBQVMsRUFBRTtZQUNwQixFQUFFLEdBQUcsUUFBUSxDQUFDO1NBQ2Y7UUFFRCxPQUFPLGFBQWEsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQztJQUMzRCxDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0NBQ0Y7QUF4Q0QsNENBd0NDIn0=