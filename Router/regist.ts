import { Router ,Response,Request} from "express";
import { SignUser } from "../controllers/signUp";
import { verifyUser } from "../controllers/verifyUser";
import { loginUser } from "../controllers/login";

const router = Router()

router.post('/SignUp',SignUser)
router.post('/verifyEmail/:otp/:Email',verifyUser)
router.post('/login',loginUser)

export default router