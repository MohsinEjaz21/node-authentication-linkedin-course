
namespace IApp {
  export type SignUpInfo = {
    favoriteFood: string;
    hairColor: string;
    bio: string;
  };

  export type SignUp = {
    id?: any;
    email: string,
    password: string,
    isVerified: boolean
    info?: SignUpInfo
  }

  export interface JwtPayload {
    id?: any;
    email: string,
    isVerified: boolean
    info?: SignUpInfo,
  }

  export type SignIn = {
    email: string,
    password: string,
  }
}
export default IApp;
