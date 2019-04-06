"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PathResolver_1 = require("./PathResolver");
class SelectBuilder {
    constructor(_Query) {
        this._Query = _Query;
        this._Properties = [];
        this._PathResolver = new PathResolver_1.PathResolver();
    }
    get isEmpty() {
        return this._Properties.length <= 0;
    }
    by(expressions) {
        const paths = expressions.map((x) => this._PathResolver.resolve(x));
        this._Properties = [...this._Properties, ...paths];
        return this;
    }
    byCustom(paths) {
        this._Properties = [...this._Properties, ...paths];
        return this;
    }
    toPartialString() {
        return this._Properties.join(",");
    }
    toString() {
        return this._Query.toString();
    }
}
exports.SelectBuilder = SelectBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0QnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9idWlsZGVyL1NlbGVjdEJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBOEM7QUFHOUMsTUFBYSxhQUFhO0lBU3hCLFlBQW9CLE1BQXNCO1FBQXRCLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBTmxDLGdCQUFXLEdBQWEsRUFBRSxDQUFDO1FBT2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSwyQkFBWSxFQUFXLENBQUM7SUFDbkQsQ0FBQztJQU5ELElBQVcsT0FBTztRQUNoQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBTU0sRUFBRSxDQUEwQyxXQUE4RDtRQUMvRyxNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXBFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNuRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTSxRQUFRLENBQUMsS0FBZTtRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDbkQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU0sZUFBZTtRQUNwQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFTSxRQUFRO1FBQ2IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2hDLENBQUM7Q0FDRjtBQWhDRCxzQ0FnQ0MifQ==