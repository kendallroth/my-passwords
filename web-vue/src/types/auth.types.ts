/** Authentication credentials (for login) */
export interface AuthLoginBody {
  email: string;
  password: string;
}

/** Account authentication tokens */
export interface AuthTokens {
  /** Authenticated account ID */
  accountId: string;
  /** Authentication JWT token */
  token: string;
}
