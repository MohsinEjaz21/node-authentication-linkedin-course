import jwt from 'jsonwebtoken';
import IApp from 'src/utils/interfaces';
import { getDbConnection } from '../../db';
import { createJwtPayload } from '../../utils/common';
import { PATH } from '../paths';
const { ObjectId } = require('mongodb');

export const updateUserInfo = {
  path: PATH.user.updateUserInfo,
  method: 'put',
  handler: (req, res) => {
    const { authorization } = req.headers;
    const { userId } = req.params;
    const { favoriteFood, hairColor, bio } = req.body;
    const updateInfo: IApp.SignUpInfo = { favoriteFood, hairColor, bio };


    if (!authorization) {
      return res.status(401).json({ message: 'No Authorization header sent' })
    }

    const token = authorization.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid Token' })
      }
      const { id } = decoded;
      if (id !== userId) {
        res.status(403).json({ message: 'Not allowed to update user data' })
      }
      const db = getDbConnection();
      const result = await db.collection('users').findOneAndUpdate(
        { _id: ObjectId(userId) },
        { $set: { info: updateInfo } }
      );
      console.log("updated user info response 🌈", result)


      const jwtPayload: IApp.JwtPayload = createJwtPayload(result.value);
      console.log("jwt payload 🌈", jwtPayload)

      jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.status(200).send({ token });
      });

    })
  },
};