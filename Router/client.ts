import { Router } from "express";
import { createClient } from "../controllers/Client/createProfile";

 const router = Router()

router.post('/uploadImage',createClient)
router.post('/')
export default router