import { getDbConnection } from "@src/db";
import jwt from "jsonwebtoken";
import { PATH } from "../paths";
const { ObjectId } = require('mongodb');

export const emailConfirmation = {
  path: PATH.auth.confirmEmail,
  method: 'get',
  handler: async (req, res) => {

    const { token } = req.params;
    console.log('token 👉 ', token)
    const db = getDbConnection()
    const { id: userId }: any = jwt.verify(token, process.env.JWT_SECRET);

    console.log('userId 👉 ', userId)
    const updatedUser = await db.collection('users').findOneAndUpdate({ _id: ObjectId(userId) }, { $set: { isVerified: true } }, { returnDocument: "after" });

    console.log('user 👉 ', updatedUser)

    if (updatedUser) {
      res.redirect('http://localhost:3000/login');
    } else {
      res.status(400).json({
        message: 'Email confirmation failed',
      });
    }
  }
}