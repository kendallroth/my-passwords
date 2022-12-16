// @ts-ignore
import { version } from "../package.json";

interface WebAppConfig {
  apiUrl: string;
  /** App environment name */
  envName: string;
  /** Whether app is deployed in production environment */
  production: boolean;
  /** Web app version */
  version: string;
}

const apiUrl = import.meta.env.VITE_API_URL as string | undefined;
if (!apiUrl) {
  throw new Error("API_URL missing!");
}

const webConfig: WebAppConfig = {
  apiUrl,
  envName: (import.meta.env.VITE_ENV_NAME as string) ?? "local",
  production: import.meta.env.NODE_ENV === "production",
  version,
};

export default webConfig;
