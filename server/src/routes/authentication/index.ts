import { emailConfirmation } from "./emailConfirmation";
import { loginRoute } from "./loginRoute";
import { sendEmailRoute } from "./sendEmail";
import { signUpRoute } from "./signUpRoute";

export const authRoutes = [
  emailConfirmation,
  signUpRoute,
  loginRoute,
  sendEmailRoute
];
