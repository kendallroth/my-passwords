import { acceptHMRUpdate, defineStore } from "pinia";

import { overrideObject } from "@utilities/override.util";

import type { AuthAccount } from "@typings/account.types";

interface AccountState {
  account: AuthAccount | null;
}

export const useAccountStore = defineStore("account", {
  state: (): AccountState => ({
    account: null,
  }),
  getters: {
    authenticated: (state) => Boolean(state.account),
  },
  actions: {
    /** Clear authenticated account (logout, etc) */
    clearAccount() {
      this.$reset();
    },
    /** Set authenticated account information */
    setAccount(payload: AuthAccount | null) {
      this.account = payload;
    },
    updateAccount(payload: Partial<AuthAccount>) {
      if (!this.account) return;

      this.account = overrideObject(this.account, payload);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccountStore, import.meta.hot));
}
