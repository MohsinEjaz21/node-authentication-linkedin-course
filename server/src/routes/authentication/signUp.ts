import { getDbConnection } from '@src/db';
import { createJwtPayload, sendEmailAxios } from '@src/utils/common';
import IApp from '@src/utils/interfaces';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PATH } from '../../config';

export const signUpRoute = {
  path: PATH.auth.signUp,
  method: 'post',
  handler: async (req, res) => {
    let payload: IApp.SignUp = req.body || {};
    console.log("signUpRoute payload 🌈", req.body)

    const db = getDbConnection()
    const user = await findUserByEmail();
    if (user) {
      return res.status(409).send('User already exists');
    }
    payload.password = await encryptPlainPassword();
    payload.info = { hairColor: '', favoriteFood: '', bio: '' }
    payload.isVerified = false;

    const insertPayload = Object.assign({}, payload);
    insertPayload.confirmPassword ? delete insertPayload.confirmPassword : null;

    const result = await insertUser(insertPayload)
    return signJwt(insertPayload);

    async function encryptPlainPassword() {
      return await bcrypt.hash(payload.password, 10);
    }

    async function insertUser(payload) {
      return await db.collection('users').insertOne(payload);
    }

    async function findUserByEmail() {
      return await db.collection('users').findOne({ email: payload.email });
    }

    function signJwt(payload) {
      payload.id = result.insertedId;
      const jwtPayload: IApp.JwtPayload = createJwtPayload(payload);

      console.log("jwt payload 🌈", jwtPayload)
      jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
        if (err) {
          return res.status(500).send(err);
        }
        sendEmailAxios(token);
        return res.status(200).send({ token });
      });
    }
  }
};