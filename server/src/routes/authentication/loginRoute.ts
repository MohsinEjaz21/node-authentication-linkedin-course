import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import IApp from 'utils/interfaces';
import { getDbConnection } from "../../db";
import { createJwtPayload } from '../../utils/common';


export const loginRoute = {
  path: '/api/login',
  method: 'post',
  handler: async (req, res) => {
    console.log("body payload => ", req.body)

    let payload: IApp.SignIn = req.body || {};

    const db = getDbConnection()
    const foundUser = await findUserByEmail(payload.email);

    if (!foundUser) {
      return res.status(401).send('User Not found');
    }

    comparePasswords();

    function comparePasswords() {
      bcrypt.compare(payload.password, foundUser.password, (err, result) => {
        if (result) {
          return signJwt(foundUser);
        }
        else {
          return res.status(401).send('Password is incorrect');
        }
      });
    }

    async function findUserByEmail(email) {
      return await db.collection('users').findOne({ email });
    }

    function signJwt(payload) {
      const jwtPayload: any = createJwtPayload(payload);
      console.log("jwt payload 🌈", payload)
      jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
        if (err) {
          return res.status(500).send("Jwt Sign Error");
        }
        return res.status(200).send({ token });
      });
    }
  }
};