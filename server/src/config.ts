const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

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
      confirmEmail: `${AUTH}confirmation/:token`,
      sendEmail: `${AUTH}sendEmail`,
    }
  }
})()

export const PAGES = {
  login: `/login`,
}

const { SERVER_URL, CLIENT_URL } = process.env
export const SEND_EMAIL_URL = `${SERVER_URL}${PATH.auth.sendEmail}`
export const CONFIRM_EMAIL_URL = (TOKEN) => `${SERVER_URL}${PATH.auth.confirmEmail.replace(':token', TOKEN)}`
export const CLIENT_LOGIN_URL = `${CLIENT_URL}${PAGES.login}`
