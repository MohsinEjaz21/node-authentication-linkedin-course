import { authRoutes } from "./authentication";
import { userRoutes } from "./user";

export const routes = [
  ...authRoutes,
  ...userRoutes
];
