import { Query } from "mongoose";
import { PaginationType, QueryString, QueryType } from "../interfaces/features";
class Features {
  public paginationResult: PaginationType;
  constructor(
    public mongooseQuery: Query<any[], any>,
    private readonly queryString: QueryString
  ) {}

  filter() {
    const QueryStringObj = { ...this.queryString };
    const filter: string[] = ["page", "limit", "sort", "fields", "search"];
    filter.map((el) => {
      delete QueryStringObj[el];
    });
    let QueryObjStr: string = JSON.stringify(QueryStringObj);
    QueryObjStr = QueryObjStr.replace(
      /\b(gte|gt|lte|lt)\b/gi,
      (match) => `$${match}`
    );
    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(QueryObjStr));
    return this;
  }

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

  pagination(countDoc: number) {
    const page: number = this.queryString.page || 1;
    const limit: number = this.queryString.limit || 5;
    const skip: number = (page - 1) * limit;
    const indexPage: number = page * limit;
    const pagination: PaginationType = {};
    pagination.currentPage = page;
    pagination.totalPages = Math.ceil(countDoc / limit);
    pagination.limit = limit;
    if (countDoc > indexPage) {
      pagination.next = Number(page) + 1;
    }
    if (skip > 0) {
      pagination.prev = Number(page) - 1;
    }
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    this.paginationResult = pagination;
    return this;
  }

  async count() {
    const clone: Query<any[], any> = this.mongooseQuery.clone();
    return await clone.countDocuments();
  }
}

export default Features;
