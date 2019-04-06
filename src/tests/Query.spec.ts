import { Query } from "../lib/builder/Query";
import { IFilterGroup } from "../lib/models/IFilterGroup";
import { IFilterClause } from "../lib/models/IFilterClause";

import { isFilterClause } from "../lib/builder/FilterBuilder";

interface Root {
  Child: Entity;
}

interface Entity {
  NumberProperty: number | null;
  StringProperty: string;
  BooleanProperty: boolean,
  NavigationProperty: Detail;
  DateProperty: Date;
}

interface Detail {
  NumberProperty: number;
  StringProperty: string;
}

describe("Query", () => {

  it("should not compile", () => {
    const query = new Query<Entity>("Entities");
    // query.filter("NumberProperty", "=", "1337");
    // query.filter("StringProperty", "=", 1337);
    // query.filter("DateProperty", "=", 1337);
    // query.filter(x => x.NavigationProperty.StringProperty, "=", 1337);
    // query.filter(x => x.NavigationProperty.NumberProperty, "=", "1337");
  }),

  it("should append $count to odata-URI", () => {
    const query = new Query<Entity>("Entities");

    query.count();

    const actual = query.toString();
    expect(actual).toBe("Entities/$count");
  }),

    it("should allow to filter by a simple property and a discrete value", () => {
      const query = new Query<Entity>("Entities");

      query.filter((x) => x.NumberProperty, "=", 1337);

      const actual = query.toString();
      expect(actual).toBe("Entities?$filter=(NumberProperty eq 1337)");
    }),

    it("should not single quote null", () => {
      const query = new Query<Entity>("Entities");

      query.filter("NumberProperty", "!=", null);

      const actual = query.toString();
      expect(actual).toBe("Entities?$filter=(NumberProperty ne null)");
    }),

    it("should not single quote number", () => {
      const query = new Query<Entity>("Entities");

      query.filter("NumberProperty", "!=", 1337);

      const actual = query.toString();
      expect(actual).toBe("Entities?$filter=(NumberProperty ne 1337)");
    }),

    it("should not single quote boolean", () => {
      const query = new Query<Entity>("Entities");

      query.filter("BooleanProperty", "!=", true);

      const actual = query.toString();
      expect(actual).toBe("Entities?$filter=(BooleanProperty ne true)");
    }),

    it("should include $count-parameter when total count is included", () => {
      const query = new Query<Entity>("Entities");

      query.includeTotalCount().filter("NumberProperty", "=", 1337);

      const actual = query.toString();
      expect(actual).toBe("Entities?$filter=(NumberProperty eq 1337)&$count=true");
    }),
    it("should respect $orderby system query", () => {
      const query = new Query<Entity>("Entities");

      query.filter("NumberProperty", "=", 1337)
        .order.by("StringProperty")
        .order.by("NumberProperty", "desc");

      const actual = query.toString();
      expect(actual).toBe("Entities?$filter=(NumberProperty eq 1337)&$orderby=StringProperty asc,NumberProperty desc");
    }),

    it("should respect $top system query", () => {
      const query = new Query<Entity>("Entities");

      query.filter("NumberProperty", "=", 1337)
        .top(42);

      const actual = query.toString();
      expect(actual).toBe("Entities?$filter=(NumberProperty eq 1337)&$top=42");
    }),

    it("should respect $skip system query", () => {
      const query = new Query<Entity>("Entities");

      query.filter("NumberProperty", "=", 1337)
        .skip(42);

      const actual = query.toString();
      expect(actual).toBe("Entities?$filter=(NumberProperty eq 1337)&$skip=42");
    }),

    it("should respect $skip system query", () => {
      const query = new Query<Entity>("Entities");

      query.filter("NumberProperty", "=", 1337)
        .top(43).skip(41);

      const actual = query.toString();
      expect(actual).toBe("Entities?$filter=(NumberProperty eq 1337)&$skip=41&$top=43");
    }),

    it("should allow to filter by a custom string and a discrete value", () => {
      const query = new Query<Entity>("Entities");

      query.filterCustom("Some/Custom/Expression", "=", "1337");

      const actual = query.toString();
      expect(actual).toBe("Entities?$filter=(Some/Custom/Expression eq '1337')");
    }),
    it("should allow to filter by two simple properties and discrete values with logical AND operator", () => {

      const query = new Query<Entity>("Entities")
        .filter("NumberProperty", "=", 1337)
        .and("StringProperty", "=", "1337");

        const actual = query.toString();
      expect(actual).toBe("Entities?$filter=(NumberProperty eq 1337) and (StringProperty eq '1337')");
    }),

    it("should allow to filter by two simple properties and discrete values with logical OR operator", () => {
      const query = new Query<Entity>("Entities");

      query
        .filter("NumberProperty", "=", 1337)
        .or("StringProperty", "=", "FilterValue");

      const actual = query.toString();
      expect(actual).toBe("Entities?$filter=(NumberProperty eq 1337) or (StringProperty eq 'FilterValue')");
    }),


    it("should allow to filter by a navigation property and a discrete value", () => {
      const query = new Query<Entity>("Entities");

      query.filter(x => x.NavigationProperty.NumberProperty, "=", 1337);

      const actual = query.toString();
      expect(actual).toBe("Entities?$filter=(NavigationProperty/NumberProperty eq 1337)");
    }),

    it("should allow to filter by two navigation properties and a discrete string value", () => {
      const query = new Query<Root>("Roots");

      query.filter(x => x.Child.NavigationProperty.StringProperty, "=", "FilterValue");

      const actual = query.toString();
      expect(actual).toBe("Roots?$filter=(Child/NavigationProperty/StringProperty eq 'FilterValue')");
    }),

    it("should allow to filter by two navigation properties and a discrete number value", () => {
      const query = new Query<Root>("Roots");

      query.filter(x => x.Child.NavigationProperty.NumberProperty, "=", 1337);

      const actual = query.toString();
      expect(actual).toBe("Roots?$filter=(Child/NavigationProperty/NumberProperty eq 1337)");
    }),

    it("should allow to group by multiple properties without a filter", () => {
      const query = new Query<Entity>("Entities");
      const actual = query.group.by(x => x.NavigationProperty.NumberProperty, "StringProperty").toString();

      expect(actual).toBe("Entities?$apply=groupby((NavigationProperty/NumberProperty,StringProperty), aggregate($count as Count))");
    }),


    it("should allow to group by single property without a filter", () => {
      const query = new Query<Entity>("Entities");
      const actual = query.group.by("NumberProperty").toString();

      expect(actual).toBe("Entities?$apply=groupby((NumberProperty), aggregate($count as Count))");
    }),


    it("should allow to group by single property with a single filter", () => {
      const query = new Query<Entity>("Entities");

      const actual = query
        .filter("StringProperty", "!=", "FilterValue")
        .group.by("NumberProperty").toString();

      expect(actual).toBe("Entities?$apply=filter((StringProperty ne 'FilterValue'))/groupby((NumberProperty), aggregate($count as Count))");
    }),
    it("should allow to group by single property with a single filter and sum aggregation", () => {
      const query = new Query<Entity>("Entities");

      const actual = query
        .filter("StringProperty", "!=", "FilterValue")
        .group.by("NumberProperty")
        .aggregate("StringProperty").with.sumAs("TheSum").toString();

      expect(actual).toBe("Entities?$apply=filter((StringProperty ne 'FilterValue'))/groupby((NumberProperty), aggregate(StringProperty with sum as TheSum))");
    }),
    it("should allow to filter by a property and then group by another", () => {
      const query = new Query<Entity>("Entities");

      const date = new Date(2018, 0, 1, 0, 0, 0, 0);

      const actual = query
        .filter("StringProperty", "!=", "FilterValue")
        .and("DateProperty", "d<", date)
        .group.by("NumberProperty")
        .aggregateCount()
        .toString();

      expect(actual)
        .toBe(`Entities?$apply=filter((StringProperty ne 'FilterValue') and (DateProperty lt 2018-01-01T00%3A00%3A00%2B01%3A00))/groupby((NumberProperty), aggregate($count as Count))`);
    }),
    it("grouping products by day should yield correct url", () => {
      const query = new Query<Entity>("Entities");

      const actual = query.filter("StringProperty", "=", "FilterValue")
        .countBy.dayOn("DateProperty").toString();

      expect(actual).toBe(`Entities/count.byDay(on='DateProperty')/?$filter=(StringProperty eq 'FilterValue')`);
    }),
    it("should allow to return query", () => {
      const query = new Query<Entity>("Entities");

      const result = query
        .filter("NumberProperty", "=", 1337)
        .or("StringProperty", "=", "1337")
        .query;

      const actual = result.toString();
      expect(actual).toBe("Entities?$filter=(NumberProperty eq 1337) or (StringProperty eq '1337')");
    }),
    it("should allow to group filters", () => {
      const query = new Query<Entity>("Entities");

      const filterClauses: IFilterClause[] = [
        { LogicalOperator: "and", Property: "NumberProperty", Operator: "=", Value: 1337 },
        { LogicalOperator: "or", Property: "NumberProperty", Operator: "=", Value: 7331 }];
      const group: IFilterGroup = { LogicalOperator: "and", FilterClauses: filterClauses, isGroup: true } as IFilterGroup;

      const result = query
        .filter("StringProperty", "=", "1337")
        .addGroup(group)
        .query;

      const actual = result.toString();
      expect(actual).toBe("Entities?$filter=(StringProperty eq '1337') and ((NumberProperty eq 1337) or (NumberProperty eq 7331))");
    }),

    // it("should allow to fluently group filters", () => {
    //   const query = new Query<Entity>("Entities");

    //   const result = query
    //     .filter("StringProperty", "=", "1337").or("StringProperty", "=", "7331")
    //     .and( _ =>
    //       _.filter("NumberProperty", "=",  1337).or("NumberProperty", "=",  7331)
    //     )
    //     .query;

    //   const actual = result.toString();
    //   expect(actual).toBe("Entities?$filter=((StringProperty eq '1337') or (StringProperty eq '7331')) and ((NumberProperty eq 1337) or (NumberProperty eq 7331))");
    // }),
    it("should distinct between IFilterClause and IFilterGroup", () => {
      const query = new Query<Entity>("Entities");

      const filterClause: IFilterClause = { LogicalOperator: "or", Property: "Owner", Operator: "=", Value: "1337" } as IFilterClause;
      const group: IFilterGroup = { LogicalOperator: "and", FilterClauses: [filterClause], isGroup: true } as IFilterGroup;

      const isClause = isFilterClause(filterClause);
      const isGroup = isFilterClause(group);

      const actual = `${isClause} ${isGroup}`;

      expect(actual).toBe("true false");
    });
});
