import axios from "axios";

import { BACKEND_API } from "./CONF";

export const api = axios.create({
  baseURL: `${BACKEND_API}/api`,
  withCredentials: true,
});
