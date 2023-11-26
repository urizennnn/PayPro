import Mail from "@sendgrid/mail";
import fs from "fs/promises";
import path from "path";
import CustomAPIErrorHandler from "../error/custom-error";
import { StatusCodes } from "http-status-codes";

async function forgotPassword(
  email: string,
  otp: number,
): Promise<void> {
  try {
    const URL = otp.toString();
    const htmlPath = path.join(__dirname, "../html/verification.html");
    const html = await fs.readFile(htmlPath, "utf-8");
    const htmlEmail = html.replace("${OTP}", URL);

    Mail.setApiKey(process.env.SENDGRID_API_KEY as string);

    const msg: {
      to: string;
      from: string;
      subject: string;
      html: string;
    } = {
      to: email,
      from: process.env.VERIFIED_EMAIL as string,
      subject: "Forgot password",
      html: htmlEmail,
    };

    await Mail.send(msg);
  } catch (error:any) {
    throw new CustomAPIErrorHandler(
      error,
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

export default forgotPassword;
