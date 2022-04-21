import env from "./config.json";
type IConfig = {
  SERVER_URL: string;
}
export const config = env as IConfig;


