import { defineStore } from "pinia";
import authApis from "../apis/auth.js";
import userApis from "../apis/user.js";
import storage from "../utils/storage.js";
import { STORAGE_KEY_TOKEN } from "../constants";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => state.token !== null,
    userInfo: (state) => {
      console.log("state.user is ", state.user);
      return state.user;
    },
  },
  actions: {
    async login(data) {
      const res = await authApis.login(data);
      await this.startNewSession(res.token);
    },

    async startNewSession(token) {
      this.clearSession();
      storage.setItem(STORAGE_KEY_TOKEN, token);
      await this.initSession(token);
    },

    async initSession(token) {
      this.token = token;
      this.user = await userApis.getCurrentUser();
    },

    async restoreExistingSession() {
      const token = storage.getItem(STORAGE_KEY_TOKEN);
      await this.initSession(token);
    },

    clearSession() {
      this.$reset();
      storage.removeItem(STORAGE_KEY_TOKEN);
    },

    endSession() {
      this.clearSession();
    },

    async logout() {
      await authApis.logout();
      this.endSession();
    },
  },
});
