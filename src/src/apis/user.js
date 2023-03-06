import { axios } from "../utils/axios.js";

export default {
  getCurrentUser: () => axios.get("/users/me"),
};
