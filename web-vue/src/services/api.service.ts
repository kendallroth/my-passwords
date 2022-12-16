import axios from "axios";

import webConfig from "@config";

import type { AxiosInstance } from "axios";

class ApiService {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: webConfig.apiUrl,
      auth: {
        password: "Passw0rd!",
        username: "admin",
      },
    });
  }
}

const singleton = new ApiService();
export default singleton;
