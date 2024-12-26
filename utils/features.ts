import { Query } from "mongoose";
import { QueryString, QueryType } from "../interfaces/features";
class Features {
  constructor(
    public mongooseQuery: Query<any[], any>,
    private readonly queryString: QueryString
  ) {}

  filter() {}
  sort() {
    if (this.queryString.sort) {
      const sortBy: string = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }
    return this;
  }
  limitField() {
    if (this.queryString.fields) {
      const fields: string = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }
  search(modelName: string) {
    if (this.queryString.search) {
      let query: QueryType = {};
      if (modelName === "products") {
        query.$or = [
          { name: new RegExp(this.queryString.search, "i") },
          { description: new RegExp(this.queryString.search, "i") },
        ];
      } else {
        query = { name: new RegExp(this.queryString.search, "i") };
      }
      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }
  pagination() {}
}

export default Features;
