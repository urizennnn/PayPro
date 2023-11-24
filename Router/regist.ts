import { Router ,Response,Request} from "express";
import { SignUser } from "../controllers/signUp";
import { verifyUser } from "../controllers/verifyUser";
import { loginUser, logout } from "../controllers/login";
import auth from "../middleware/auth";

const router = Router()

router.post('/SignUp',SignUser)
router.post('/verifyEmail/:otp/:Email',verifyUser)
router.post('/login',loginUser)
router.delete('/logout',auth,logout)

export default router