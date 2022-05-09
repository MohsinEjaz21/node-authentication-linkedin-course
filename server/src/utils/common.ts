import { SEND_EMAIL_URL } from '@src/config';
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
  axios.post(SEND_EMAIL_URL, { token }).then(() => {
    console.log('Email sent successfully');
  }).catch((err) => {
    console.log('Email sent failed => ', err);
  });
}