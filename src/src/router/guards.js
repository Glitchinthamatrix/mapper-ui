import { useAuthStore } from "../stores/auth";
import storage from "../utils/storage.js";
import { STORAGE_KEY_TOKEN } from "../constants.js";

// eslint-disable-next-line no-unused-vars
export async function checkAuth(to, from) {
  const auth = useAuthStore();
  if (to.name === "login" || to.name === "sign-up") {
    return true;
  } else if (auth.isAuthenticated) {
    return true;
  } else if (storage.itemExists(STORAGE_KEY_TOKEN)) {
    await auth.restoreExistingSession();
    return true;
  } else {
    return { name: "login" };
  }
}
