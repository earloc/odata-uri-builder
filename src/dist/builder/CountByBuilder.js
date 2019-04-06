"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PathResolver_1 = require("./PathResolver");
class CountByBuilder {
    constructor(_Query) {
        this._Query = _Query;
        this._ByDay = "";
        this._PathResolver = new PathResolver_1.PathResolver();
    }
    get isEmpty() {
        return this._ByDay === "";
    }
    dayOn(expression) {
        this._ByDay = this._PathResolver.resolve(expression);
        return this._Query;
    }
    toPartialString() {
        return `/count.byDay(on='${this._ByDay}')/`;
    }
    toString() {
        return this._Query.toString();
    }
}
exports.CountByBuilder = CountByBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ291bnRCeUJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvYnVpbGRlci9Db3VudEJ5QnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUE4QztBQUc5QyxNQUFhLGNBQWM7SUFTekIsWUFBb0IsTUFBc0I7UUFBdEIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFObEMsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQU9sQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksMkJBQVksRUFBVyxDQUFDO0lBQ25ELENBQUM7SUFORCxJQUFXLE9BQU87UUFDaEIsT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBTU0sS0FBSyxDQUEwQyxVQUFzRDtRQUMxRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3JELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRU0sZUFBZTtRQUNwQixPQUFPLG9CQUFvQixJQUFJLENBQUMsTUFBTSxLQUFLLENBQUM7SUFDOUMsQ0FBQztJQUVNLFFBQVE7UUFDYixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDaEMsQ0FBQztDQUNGO0FBekJELHdDQXlCQyJ9