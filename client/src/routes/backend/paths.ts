export const PATH = (() => {
  const USERS = `/api/users/`;
  const AUTH = `/api/auth/`;
  return {
    user: {
      updateUserInfo: `${USERS}:userId`,
    },
    auth: {
      login: `${AUTH}login`,
      signUp: `${AUTH}signup`,
      confirmEmail: `${AUTH}confirmation:token`,
      sendEmail: `${AUTH}sendEmail`,
      forgetPassword: `${AUTH}forgetPassword`,
    }
  }
})()

