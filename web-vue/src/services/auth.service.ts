import { useAccountStore } from "@stores";

import ApiService from "./api.service";

import type { AuthAccount } from "@typings/account.types";
import type { AuthLoginBody, AuthTokens } from "@typings/auth.types";

const AUTH_TOKEN_KEY = "authToken";
const ACCOUNT_ID_KEY = "accountId";

class AuthService {
  /** Authenticated account ID */
  accountId: string | null = null;
  /** Authentication JWT token */
  authToken: string | null = null;

  /** Determine whether user is authenticated */
  hasAuthTokens(): boolean {
    if (this.authToken && this.accountId) {
      ApiService.setApiAuth(this.authToken);
      return true;
    }

    // Load authentication if not already loaded
    this.loadAuth();

    const hasAuth = Boolean(this.authToken && this.accountId);
    if (hasAuth && this.authToken) {
      ApiService.setApiAuth(this.authToken);
    }

    return hasAuth;
  }

  /** Load stored authentication tokens */
  loadAuth(): void {
    this.authToken = localStorage.getItem(AUTH_TOKEN_KEY) ?? null;
    this.accountId = localStorage.getItem(ACCOUNT_ID_KEY) ?? null;
  }

  async fetchAccount(): Promise<AuthAccount> {
    const response = await ApiService.api.get("/account");
    const accountData = response.data;

    const account: AuthAccount = {
      email: accountData.email,
      id: accountData.id,
    };

    const accountStore = useAccountStore();
    accountStore.setAccount(account);

    return account;
  }

  /** Log user in via credentials */
  async login(credentials: AuthLoginBody): Promise<void> {
    const response = await ApiService.api.post("/account/login", credentials);
    const tokens: AuthTokens = response.data;

    this.setAuthTokens(tokens);
  }

  /**
   * Logout authenticated user and clean up state
   *
   * NOTE: Only cleans up app state and avoids any routing, as it may be called
   *         from various places, including logout screen!
   */
  async logout(args: { ignoreStore?: boolean } = {}): Promise<void> {
    // Revoke necessary tokens and clean up other authentication state
    this.removeAuthTokens();

    if (!args.ignoreStore) {
      const accountStore = useAccountStore();
      accountStore.clearAccount();
    }
  }

  /**
   * Clean up local authentication tokens
   *
   * NOTE: Tokens are stored in memory and local storage
   */
  removeAuthTokens(): void {
    this.authToken = null;
    this.accountId = null;

    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(ACCOUNT_ID_KEY);

    // Clear Axios authorization header
    ApiService.setApiAuth(undefined);
  }

  /**
   * Store authentication tokens
   *
   * NOTE: Tokens are stored in memory and local storage
   */
  setAuthTokens(tokens: AuthTokens): void {
    const { accountId, token } = tokens;

    this.accountId = accountId;
    this.authToken = token;

    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(ACCOUNT_ID_KEY, accountId);

    // Set Axios authorization header
    ApiService.setApiAuth(token);
  }
}

const singleton = new AuthService();
export default singleton;
