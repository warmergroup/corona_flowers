import { defineStore } from "pinia";
import type { AuthType } from "~/interfaces";

export const useAuth = defineStore("authstate", {
  state: () => ({
    authState: "login" as AuthType,
  }),
  actions: {
    setAuth(authState: AuthType) {
      this.authState = authState;
    },
  },
});
