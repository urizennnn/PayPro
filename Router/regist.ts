import { Router ,Response,Request} from "express";
import { SignUser } from "../controllers/signUp";

const router = Router()

router.post('/SignUp',SignUser)

export default router