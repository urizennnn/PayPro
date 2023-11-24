import { verifyJWT, cookies } from "../utils/jwt";
import CustomAPIErrorHandler from "../error/custom-error";
import { StatusCodes } from "http-status-codes";
import { Response, Request, NextFunction } from "express";
import { findUser } from "../utils/helper";

async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const { accessToken, refreshToken } = req.signedCookies;
    const payload = verifyJWT(refreshToken);
    if (!payload) {
      throw new CustomAPIErrorHandler(
        "Invalid JWT payload",
        StatusCodes.BAD_REQUEST,
      );
    }
    console.log(payload)
    //@ts-ignore
    const existing:any = await findUser(payload?.Email)

    if (!existing) {
      throw new CustomAPIErrorHandler("Not found", StatusCodes.BAD_REQUEST);
    }
    //@ts-ignore
    cookies(res, existing, existing.refreshToken);
    //@ts-ignore
    req.user = payload;
    next();
  } catch (error: any) {
    throw new CustomAPIErrorHandler(error, StatusCodes.BAD_REQUEST);
  }
}

export default auth;
