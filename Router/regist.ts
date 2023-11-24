import { Router ,Response,Request} from "express";
import { SignUser } from "../controllers/signUp";
import { verifyUser } from "../controllers/verifyUser";

const router = Router()

router.post('/SignUp',SignUser)
router.post('/verifyEmail/:otp/:Email',verifyUser)

export default router