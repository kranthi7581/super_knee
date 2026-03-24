// import { getTransporter } from "../config/mailer.js";

// export const sendEmail = async (to, subject, html) => {
//   try {
//     const transporter = getTransporter();
//     console.log(`DIAGNOSTIC: Attempting to send email to ${to}`);
//     console.log(`DIAGNOSTIC: Subject: ${subject}`);

//     const info = await transporter.sendMail({
//       from: `"Super Health" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html,
//     });

//     console.log("SUCCESS: Email sent successfully!");
//     console.log("DIAGNOSTIC: Message ID:", info.messageId);
//     console.log("DIAGNOSTIC: Response:", info.response);
//   } catch (error) {
//     console.error(`FAILURE: Could not send email to ${to}.`);
//     console.error("DIAGNOSTIC: Error Message:", error.message);
//     console.error("DIAGNOSTIC: Error Code:", error.code);
//     console.error("DIAGNOSTIC: Error Details:", error);
//     throw error;
//   }
// };
// import { getTransporter } from "../config/mailer.js";

// export const sendEmail = async (to, subject, html) => {
//   try {
//     const transporter = getTransporter();
//     console.log(`DIAGNOSTIC: Attempting to send email to ${to}`);
//     console.log(`DIAGNOSTIC: Subject: ${subject}`);

//     const info = await transporter.sendMail({
//       from: `"Super Health" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html,
//     });

//     console.log("SUCCESS: Email sent successfully!");
//     console.log("DIAGNOSTIC: Message ID:", info.messageId);
//     console.log("DIAGNOSTIC: Response:", info.response);
//   } catch (error) {
//     console.error(`FAILURE: Could not send email to ${to}.`);
//     console.error("DIAGNOSTIC: Error Message:", error.message);
//     console.error("DIAGNOSTIC: Error Code:", error.code);
//     console.error("DIAGNOSTIC: Error Details:", error);
//     throw error;
//   }
// };




// -----------------------

import sgMail from "../config/sendgrid.js";
import dotenv from "dotenv";

dotenv.config();

// (SendGrid API Key is already set in ../config/sendgrid.js)

export const sendEmail = async (to, subject, html) => {
  try {

// --- PREVIOUS CODE ---
//     const msg = {
//       to,
//       from: process.env.EMAIL_FROM,
//       subject,
//       html
//     };
// -----------------------

// --- UPDATED CODE ---
    console.log("DIAGNOSTIC: process.env.EMAIL_FROM =", process.env.EMAIL_FROM);
    const msg = {
      to,
      from: {
        email: process.env.EMAIL_FROM,
        name: "Super Health Team"
      },
      subject,
      html
    };
    console.log("DIAGNOSTIC: Sending email with msg.from =", JSON.stringify(msg.from));
// -----------------------

    const response = await sgMail.send(msg);

    console.log("Email sent:", response[0].statusCode);

  } catch (error) {

    console.error("SendGrid Error:", error.response?.body || error.message);
    throw error;

  }

};