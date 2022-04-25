import IApp from 'utils/interfaces';
export function extractKeysFromInterface<O>(o: O) {
  return Object.keys(o) as (keyof O)[];
}

export function createJwtPayload(payload) {
  let jwtPayload: IApp.JwtPayload = {} as IApp.JwtPayload;
  jwtPayload.email = payload.email;
  jwtPayload.isVerified = payload.isVerified;
  jwtPayload.info = payload.info;
  jwtPayload.id = payload?.insertedId || payload?._id || payload?.id;
  return jwtPayload;
}