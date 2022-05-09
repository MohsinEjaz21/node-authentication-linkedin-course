import { emailConfirmation } from "./email/confirmEmail";
import { loginRoute } from "./login";
import { sendEmailRoute } from "./email/sendEmail";
import { signUpRoute } from "./signUp";

export const authRoutes = [
  emailConfirmation,
  signUpRoute,
  loginRoute,
  sendEmailRoute
];
