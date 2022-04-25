import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const sendEmailRoute = {
  path: '/api/sendEmail',
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

    let transporter = createTransporter();
    sendEmail(token);

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

    async function sendEmail(TOKEN) {
      const { SENDER, RECIEVERS, SUBJECT } = props;
      const HTML = `
      <h1>Verify your Email</h1>
      <p>
        Please click on the link to verify your email
        <a href="
        http://localhost:3000/confirmation/${TOKEN}
        ">Click to Verify Email</a>
      </p>
      `
      transporter.sendMail({
        from: SENDER,
        to: RECIEVERS,
        subject: SUBJECT,
        html: HTML,
      }).then(info => {
        console.log("Message sent: %s", info.messageId);
      })
    }


  }
}


