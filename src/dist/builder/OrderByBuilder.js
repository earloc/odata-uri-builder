"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PathResolver_1 = require("./PathResolver");
class OrderByBuilder {
    constructor(_Query) {
        this._Query = _Query;
        this._OrderBy = [];
        this._PathResolver = new PathResolver_1.PathResolver();
    }
    get isEmpty() {
        return this._OrderBy.length <= 0;
    }
    by(expression, direction = "asc") {
        const path = this._PathResolver.resolve(expression);
        return this.byCustom(path, direction);
    }
    byCustom(path, direction = "asc") {
        this._OrderBy.push({ direction, path });
        return this._Query;
    }
    toPartialString() {
        const orderBy = this._OrderBy
            .map((x) => `${x.path} ${x.direction}`)
            .join(",");
        return `$orderby=${orderBy}`;
    }
    toString() {
        return this._Query.toString();
    }
}
exports.OrderByBuilder = OrderByBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JkZXJCeUJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvYnVpbGRlci9PcmRlckJ5QnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUE4QztBQVU5QyxNQUFhLGNBQWM7SUFTekIsWUFBb0IsTUFBc0I7UUFBdEIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFObEMsYUFBUSxHQUFlLEVBQUUsQ0FBQztRQU9oQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksMkJBQVksRUFBVyxDQUFDO0lBQ25ELENBQUM7SUFORCxJQUFXLE9BQU87UUFDaEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQU1NLEVBQUUsQ0FBMEMsVUFBc0QsRUFBRSxZQUE0QixLQUFLO1FBQzFJLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVNLFFBQVEsQ0FBQyxJQUFZLEVBQUUsWUFBNEIsS0FBSztRQUM3RCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRU0sZUFBZTtRQUNwQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUTthQUMxQixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDdEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWIsT0FBTyxZQUFZLE9BQU8sRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFTSxRQUFRO1FBQ2IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2hDLENBQUM7Q0FDRjtBQWxDRCx3Q0FrQ0MifQ==