import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";
configDotenv();

export const sendMail = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: "krishnarajbhar767@gmail.com",
        pass: process.env.GOOGLE_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: '"ED-Tech"<krishnarajbhar767@gmail.com>',
      to: email, // list of receivers
      subject: title, // Subject line
      html: body, // html body
    });

    ("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    ("Error While Sending Mail", error);
  }
};
