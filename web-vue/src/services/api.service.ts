import axios from "axios";
import httpStatus from "http-status";

import webConfig from "@config";
import router from "@router";
import { AuthService } from "@services";

import type { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

class ApiService {
  api: AxiosInstance;

  constructor() {
    this.api = this.createApiInstance();

    this.api.interceptors.request.use(this.interceptRequest);

    this.api.interceptors.response.use((response) => response, this.interceptError);
  }

  createApiInstance(overrides: AxiosRequestConfig = {}): AxiosInstance {
    return axios.create({
      baseURL: webConfig.apiUrl,
      timeout: 50000,
      ...overrides,
    });
  }

  async interceptError(error: AxiosError) {
    const status = error.response?.status ?? null;

    if (status !== httpStatus.UNAUTHORIZED) {
      return Promise.reject(error);
    }

    // TODO: Support refresh token workflow

    await AuthService.logout();

    const { fullPath, name } = router.currentRoute.value;

    // Avoid nesting redirections if already on login route (or with another redirect)
    if (name !== "authLogin" && !fullPath.includes("redirectUrl")) {
      router.replace({
        path: "/auth/login",
        query: { redirectUrl: fullPath },
      });
    }

    return Promise.reject(error);
  }

  interceptRequest(config: AxiosRequestConfig): AxiosRequestConfig {
    // TODO: Support logging

    return config;
  }

  setApiAuth(token: string | undefined) {
    if (!token) {
      delete this.api.defaults.headers.common["Authorization"];
    } else {
      this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }
}

const singleton = new ApiService();
export default singleton;
