import Mail from "@sendgrid/mail";
import fs from "fs/promises";
import CustomAPIErrorHandler from "../error/custom-error";
import { StatusCodes } from "http-status-codes";

async function verificationEmail(email: string, otp: number): Promise<void> {
  try {
    const OTP = otp.toString()
    const html = await fs.readFile(
      __dirname + "/../html/verification.html",
      "utf-8",
    );
    const htmlMail = html.replace("${OTPP}", OTP);
    Mail.setApiKey(process.env.SENDGRID_API_KEY as string);

    const msg: {
      to: string;
      from: string;
      subject: string;
      html: string;
    } = {
      to: email,
      from: process.env.VERIFIED_EMAIL as string,
      subject: "Verify Your Email",
      html: htmlMail,
    };

    await Mail.send(msg);
  } catch (error:any) {
    console.error('Error sending verification email:', error);

    if (error.response) {
      console.error('SendGrid API Error Response:', error.response.body);
    }

    throw new CustomAPIErrorHandler(
      "Internal Server Error",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

export default verificationEmail;
