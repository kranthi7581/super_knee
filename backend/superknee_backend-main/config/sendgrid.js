// import nodemailer from "nodemailer";

// export const getTransporter = () => {

//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,

//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     }
//   });

//   return transporter;
// };




//nodemailer
// import nodemailer from "nodemailer";

// export const getTransporter = () => {

//   const transporter = nodemailer.createTransport({

//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,

//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     },

//     tls: {
//       rejectUnauthorized: false
//     },

//     family: 4   // forces IPv4 instead of IPv6

//   });

//   return transporter;
// };

import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default sgMail;