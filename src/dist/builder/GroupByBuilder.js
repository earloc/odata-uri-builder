"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AggregateBuilder_1 = require("./AggregateBuilder");
const PathResolver_1 = require("./PathResolver");
class GroupByBuilder {
    constructor(_Query) {
        this._Query = _Query;
        this._GroupBy = [];
        this._PathResolver = new PathResolver_1.PathResolver();
        this._Aggregate = new AggregateBuilder_1.AggregateBuilder(_Query, this);
    }
    get isEmpty() {
        return this._GroupBy.length <= 0;
    }
    by(...expressions) {
        const paths = expressions.map((x) => this._PathResolver.resolve(x));
        this._GroupBy = [...this._GroupBy, ...paths];
        return this;
    }
    byCustom(...paths) {
        this._GroupBy = [...this._GroupBy, ...paths];
        return this;
    }
    aggregate(expression) {
        return this._Aggregate.by(expression);
    }
    aggregateCount() {
        return this._Aggregate.byCustom("$count").as("Count");
    }
    aggregateCustom(path) {
        return this._Aggregate.byCustom(path);
    }
    toPartialString() {
        if (!this.isEmpty) {
            const groupBy = this._GroupBy.join(",");
            const aggregate = this._Aggregate.toPartialString();
            return `groupby((${groupBy}), ${aggregate})`;
        }
        else {
            return "";
        }
    }
    toString() {
        return this._Query.toString();
    }
}
exports.GroupByBuilder = GroupByBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JvdXBCeUJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvYnVpbGRlci9Hcm91cEJ5QnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlEQUF5RTtBQUN6RSxpREFBOEM7QUFHOUMsTUFBYSxjQUFjO0lBVXpCLFlBQW9CLE1BQXNCO1FBQXRCLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBTmxDLGFBQVEsR0FBYSxFQUFFLENBQUM7UUFPOUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLDJCQUFZLEVBQVcsQ0FBQztRQUNqRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksbUNBQWdCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFQRCxJQUFXLE9BQU87UUFDaEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQU9NLEVBQUUsQ0FBMEMsR0FBRyxXQUE4RDtRQUNsSCxNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXBFLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTSxRQUFRLENBQUMsR0FBRyxLQUFlO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTSxTQUFTLENBQTBDLFVBQXNEO1FBQzlHLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUNNLGNBQWM7UUFDbkIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUNNLGVBQWUsQ0FBQyxJQUFZO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVNLGVBQWU7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUNwRCxPQUFPLFlBQVksT0FBTyxNQUFNLFNBQVMsR0FBRyxDQUFDO1NBQzlDO2FBQU07WUFDTCxPQUFPLEVBQUUsQ0FBQztTQUNYO0lBQ0gsQ0FBQztJQUVNLFFBQVE7UUFDYixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDaEMsQ0FBQztDQUNGO0FBbERELHdDQWtEQyJ9