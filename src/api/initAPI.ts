import axios from "axios";
import { ENV } from "../config/env";

export default axios.create({
  baseURL: ENV.BACKEND_SERVER_ENDPOINT,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});
