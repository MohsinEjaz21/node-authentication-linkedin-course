const { ObjectId } = require('mongodb');

namespace IApp {
  export type SignUpInfo = {
    favoriteFood: string;
    hairColor: string;
    bio: string;
  };

  export type SignUp = {
    id?: typeof ObjectId;
    email: string,
    password: string,
    isVerified: boolean
    info?: SignUpInfo
    confirmPassword?: string
  }

  export interface JwtPayload {
    id?: typeof ObjectId;
    email: string,
    isVerified: boolean
    info?: SignUpInfo,
  }

  export type SignIn = {
    email: string,
    password: string,
  }
}
export = IApp;
