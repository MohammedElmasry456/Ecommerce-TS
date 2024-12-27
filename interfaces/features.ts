export interface QueryString {
  readonly sort?: string;
  readonly search?: string;
  readonly fields?: string;
  readonly page?: number;
  readonly limit?: number;
  [key: string]: any;
}

export interface QueryType {
  $or?: Array<{ [key: string]: RegExp }>;
  [key: string]: any;
}

export interface PaginationType {
  totalPages?: number;
  limit?: number;
  currentPage?: number;
  next?: number;
  prev?: number;
}
