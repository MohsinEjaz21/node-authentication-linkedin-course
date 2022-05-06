import axios from 'axios';
import IApp from './interfaces';
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

export const sendEmailAxios = (token) => {
  axios.post('http://localhost:1337/api/sendEmail', { token }).then(() => {
    console.log('Email sent successfully');
    // return res.status(200).send('Email sent');
  }).catch((err) => {
    console.log('Email sent failed => ', err);
    // return res.status(500).send(err);
  });
}