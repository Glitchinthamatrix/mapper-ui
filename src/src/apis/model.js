import { axios } from "../utils/axios.js";

export default {
  getDataTypes: () => axios.get("/entities/models/data-types"),
  getClauses: () => axios.get("/entities/models/clauses"),
  getRegexPatterns: () => axios.get("/entities/models/regex-patterns"),
  getModels: () => axios.get("/entities/models"),
  addModel: (data) => axios.post("/entities/models", data),
};
