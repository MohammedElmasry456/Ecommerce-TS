import nodeMailer from "nodemailer";
import { Options } from "../interfaces/sendMail";

const sendMail = async (options: Options) => {
  const createTransport = nodeMailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: `${process.env.EMAIL_NAME}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  });

  await createTransport.sendMail({
    from: `"${process.env.APP_NAME}" <${process.env.EMAIL_NAME}>`,
    to: `${options.email}`,
    subject: `${options.subject}`,
    html: `<h1>reset code :</h1>  ${options.message}`,
  });
};

export default sendMail;
