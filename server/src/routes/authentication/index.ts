import { emailConfirmation } from "./confirmEmail";
import { loginRoute } from "./login";
import { sendEmailRoute } from "./sendEmail";
import { signUpRoute } from "./signUp";

export const authRoutes = [
  emailConfirmation,
  signUpRoute,
  loginRoute,
  sendEmailRoute
];
