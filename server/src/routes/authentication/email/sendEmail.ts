import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import path from "path";
import { CONFIRM_EMAIL_URL, PATH } from "../../../config";
const mailHandleBar = require('nodemailer-express-handlebars')

export const sendEmailRoute = {
  path: PATH.auth.sendEmail,
  method: 'post',
  handler: async (req, res) => {

    const { token } = req.body;
    const { email: RECEIVER_EMAIL }: any = jwt.verify(token, process.env.JWT_SECRET);
    const { SENDER_FULLNAME, SENDER_EMAIL, SENDER_PASSWORD } = process.env

    const props = {
      SENDER: `${SENDER_FULLNAME} <${SENDER_EMAIL}>`,
      SENDER_EMAIL: SENDER_EMAIL,
      SENDER_PASSWORD: SENDER_PASSWORD,
      HOST: 'smtp.gmail.com',
      PORT: 465,
      SECURE: true,
      SUBJECT: 'Email Confirmation 🌈',
      RECIEVERS: RECEIVER_EMAIL,
    }

    main();

    function main() {
      let transporter = createTransporter();
      transporter.use('compile', mailHandleBar(handlebarOptions()));
      sendEmail(transporter, token);
    }

    function handlebarOptions() {
      return {
        viewEngine: {
          partialsDir: path.resolve('public/assets/hbs/'),
          defaultLayout: false,
        },
        viewPath: path.resolve('public/assets/hbs/')
      }
    };

    function createTransporter() {
      const { HOST, PORT, SENDER_EMAIL, SENDER_PASSWORD, SECURE } = props;
      return nodemailer.createTransport({
        host: HOST,
        port: PORT,
        secure: SECURE,
        auth: {
          user: SENDER_EMAIL,
          pass: SENDER_PASSWORD
        },
      });
    }

    async function sendEmail(transporter, TOKEN) {
      const { SENDER, RECIEVERS, SUBJECT } = props;
      transporter.sendMail({
        from: SENDER,
        to: RECIEVERS,
        subject: SUBJECT,
        template: 'sendEmail',
        context: {
          STYLES: path.resolve('public/assets/css/'),
          TOKEN: CONFIRM_EMAIL_URL(TOKEN)
        }
      }).then(info => {
        console.log("Message sent: %s", info.messageId);
      })
    }


  }
}


