import Mail from "@sendgrid/mail";
import fs from "fs/promises";
import CustomAPIErrorHandler from "../error/custom-error";
import { StatusCodes } from "http-status-codes";
import { findpayment } from "../utils/payemntQueries";
import { InvoiceModel } from "../Models/InvoiceModel";

async function invoice(email: string, body: any): Promise<void> {
  try {
    const html = await fs.readFile(__dirname + "/../html/invoice.html", "utf-8");

    // Replace placeholders in HTML with actual data from the 'body' object
    const htmlReplaced = Object.entries(body).reduce((acc, [key, value]) => {
      const regex = new RegExp(`{{${key}}}`, "g");
      return acc.replace(regex, String(value));
    }, html);

    Mail.setApiKey(process.env.SENDGRID_API_KEY as string);

    const msg: {
      to: string;
      from: string;
      subject: string;
      html: string;
    } = {
      to: email,
      from: process.env.VERIFIED_EMAIL as string,
      subject: "Alert for an unpaid invoice",
      html: htmlReplaced, // Use the replaced HTML
    };

    await Mail.send(msg);
  } catch (error) {
    throw new CustomAPIErrorHandler(
      "Internal Server Error",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

export default invoice;
