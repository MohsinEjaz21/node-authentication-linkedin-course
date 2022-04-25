import jwt from "jsonwebtoken";
import { getDbConnection } from "../../db";

export const emailConfirmation = {
  path: '/api/emailConfirmation/:token',
  method: 'get',
  handler: async (req, res) => {

    const { token } = req.params;
    const db = getDbConnection()
    const { id: userId }: any = jwt.verify(token, process.env.JWT_SECRET);
    const updatedUser = await db.collection('users').findOneAndUpdate({ _id: userId }, { $set: { isEmailConfirmed: true } });
    if (updatedUser) {
      res.redirect('/login');
    } else {
      res.status(400).json({
        message: 'Email confirmation failed',
      });
    }
  }
}