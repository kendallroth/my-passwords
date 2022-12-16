/**
 * Paginated data with pagination info/links
 *
 * NOTE: Since class uses generics for tying 'data', multiple properties must be replicated for
 *         Swagger documentation (since plugin does not pick up properly with generics).
 */
export interface PaginatedResult<T> {
  // NOTE: Apparently decorator is mandatory to prevent odd circular reference error!
  data: T[];
  /** Result pagination information */
  pagination: Pagination;
}

/** Pagination request params */
export interface PaginationQuery {
  /** Requested page size */
  size?: number;
  /** Requested page number */
  page?: number;
}

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
