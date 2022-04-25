import axios from 'axios';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import IApp from 'utils/interfaces';
import { getDbConnection } from "../../db";
import { createJwtPayload } from '../../utils/common';


export const signUpRoute = {
  path: '/api/signup',
  method: 'post',
  handler: async (req, res) => {
    let payload: IApp.SignUp = req.body || {};
    console.log("signUpRoute payload 🌈", req.body)

    const db = getDbConnection()
    await blockDuplicateUser();
    payload.password = await encryptPlainPassword();
    payload.info = { hairColor: '', favoriteFood: '', bio: '' }
    payload.isVerified = false;

    const result = await insertUser()
    return signJwt();

    async function encryptPlainPassword() {
      return await bcrypt.hash(payload.password, 10);
    }

    async function insertUser() {
      return await db.collection('users').insertOne(payload);
    }

    async function blockDuplicateUser() {
      const user = await db.collection('users').findOne({ email: payload.email });
      if (user) {
        return res.status(409).send('User already exists');
      }
    }

    function signJwt() {
      payload.id = result.insertedId;
      const jwtPayload: IApp.JwtPayload = createJwtPayload(payload);

      console.log("jwt payload 🌈", jwtPayload)
      jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
        if (err) {
          return res.status(500).send(err);
        }

        axios.post('http://localhost:1337/api/sendEmail', { token }).then(() => {
          console.log('Email sent successfully');
          // return res.status(200).send('Email sent');
        }).catch((err) => {
          console.log('Email sent failed => ', err);
          // return res.status(500).send(err);
        });

        return res.status(200).send({ token });
      });
    }
  }
};