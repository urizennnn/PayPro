import { Router ,Response,Request} from "express";
import { SignUser } from "../controllers/signUp";
import { verifyUser } from "../controllers/verifyUser";
import { loginUser, logout } from "../controllers/login";
import auth from "../middleware/auth";
import { forgotPass, verifyOTP,updatePassword,resendOTP } from "../controllers/password";
import { dashboard } from "../controllers/dashboard";

const router = Router()

router.post('/SignUp',SignUser)
router.post('/verifyEmail/:otp/:Email',verifyUser)
router.post('/login',loginUser)
router.delete('/logout',auth,logout)
router.post('/forgotPassword',forgotPass)
router.post('/verifyOTP',verifyOTP)
router.post('/updatePassword',updatePassword)
router.post('/resendOTP',resendOTP)
router.get('/dashboard',dashboard)
export default router