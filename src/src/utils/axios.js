import baseAxios from "axios";
import router from "../router/index.js";
import { useAuthStore } from "../stores/auth.js";

export const axios = baseAxios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axios.interceptors.request.use(
  (config) => {
    if (config.url.startsWith("/")) {
      const auth = useAuthStore();
      config.headers["authorization"] = auth.token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const HTTP_STATUS_BAD_REQUEST = 400;
const HTTP_STATUS_UNAUTHORIZED = 401;
const HTTP_STATUS_FORBIDDEN = 403;
const HTTP_STATUS_NOT_FOUND = 404;
const HTTP_STATUS_UNPROCESSABLE_ENTITY = 422;

axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === HTTP_STATUS_UNPROCESSABLE_ENTITY) {
        return Promise.reject(error.response.data);
      }

      if (
        status === HTTP_STATUS_BAD_REQUEST ||
        status === HTTP_STATUS_FORBIDDEN ||
        status === HTTP_STATUS_NOT_FOUND ||
        status === HTTP_STATUS_UNAUTHORIZED
      ) {
        const auth = useAuthStore();
        auth.endSession();
        router.push({ name: "login" });
        return Promise.reject({});
      }
    }
    return Promise.reject({
      message: "Unexpected error occured, Please try again",
    });
  }
);
