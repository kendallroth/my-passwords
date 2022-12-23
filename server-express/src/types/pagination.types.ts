/** Page-based pagination metadata */
export interface Pagination {
  /** Current pagination page */
  page: number;
  /** Page size */
  size: number;
  /** Total number of available items (ie. not just item count of current page!) */
  totalItems: number;
  /** Total number of available pages */
  totalPages: number;
}

/** Pagination request params */
export interface PaginationQuery {
  /** Requested page size */
  size?: string;
  /** Requested page number */
  page?: string;
}

/** Pagination request params */
export interface PaginationInput {
  /** Requested page size */
  size: number;
  /** Requested page number */
  page: number;
}

/**
 * Paginated data with pagination info/links
 *
 * NOTE: Since class uses generics for tying 'data', multiple properties must be replicated for
 *         Swagger documentation (since plugin does not pick up properly with generics).
 */
export interface PaginatedResult<T> {
  data: T[];
  /** Result pagination information */
  pagination: Pagination;
}
